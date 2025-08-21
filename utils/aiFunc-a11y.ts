import { Page } from '@playwright/test';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { HttpsProxyAgent } from 'https-proxy-agent';

dotenv.config();
// Configure the default for all requests:
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,
  httpAgent: process.env.PROXY_URL ? new HttpsProxyAgent(process.env.PROXY_URL) : undefined
});


interface PageElement {
    type: string;
    text?: string;
    role?: string;
    label?: string;
    ariaLabel?: string;
    alt?: string;
    isVisible: boolean;
    selector?: string;
    backgroundColor?: string;
    color?: string;
}

interface PageSnapshot {
    url: string;
    timestamp: string;
    elements: PageElement[];
    title: string;
    lang: string;
}

// Class responsible for checking web page accessibility using AI analysis
// Utilizes Playwright for page interaction and OpenAI for AI processing
export class AccessibilityAIChecker {

    // Page object from Playwright to interact with the browser
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private async capturePageSnapshot(): Promise<PageSnapshot> {
        const snapshot: PageSnapshot = {
            url: this.page.url(),
            timestamp: new Date().toISOString(),
            elements: [],
            title: await this.page.title(),
            lang: await this.page.evaluate(() => document.documentElement.lang)
        };

        const elements = await this.page.$$(`
            button, 
            a, 
            input, 
            img, 
            [role="button"],
            [role="link"],
            [role="tab"],
            [role="menuitem"],
            h1, h2, h3, h4, h5, h6,
            label,
            select,
            textarea
        `);

        for (const element of elements) {
            try {
                const elementInfo: PageElement = {
                    type: await element.evaluate(el => el.tagName.toLowerCase()),
                    text: await element.textContent() || undefined,
                    role: await element.getAttribute('role') || undefined,
                    label: await element.getAttribute('aria-label') || undefined,
                    ariaLabel: await element.getAttribute('aria-labelledby') || undefined,
                    alt: await element.getAttribute('alt') || undefined,
                    isVisible: await element.isVisible(),
                    selector: await element.evaluate(el => {
                        if (el.id) return `#${el.id}`;
                        if (el.className) return `.${el.className.split(' ').join('.')}`;
                        return undefined;
                    })
                };

                const styles = await element.evaluate((el) => {
                    const computed = window.getComputedStyle(el);
                    return {
                        backgroundColor: computed.backgroundColor,
                        color: computed.color
                    };
                });

                elementInfo.backgroundColor = styles.backgroundColor;
                elementInfo.color = styles.color;

                snapshot.elements.push(elementInfo);
            } catch (error) {
                console.error('Error capturing element:', error);
            }
        }

        return snapshot;
    }

    private async analyzeWithAI(snapshot: PageSnapshot): Promise<string> {
        const promptText = `
Analyze this webpage snapshot for accessibility and label coherence.

URL: ${snapshot.url}
Title: ${snapshot.title}
Language: ${snapshot.lang}

Please evaluate:
1. Label consistency and clarity
2. Missing accessibility attributes
3. Semantic HTML usage
4. Navigation structure
5. Color contrast issues
6. Content coherence

Elements to analyze:
${JSON.stringify(snapshot.elements, null, 2)}

Provide a detailed analysis with:
- Specific issues found
- Severity level for each issue
- Recommendations for improvement
- Overall accessibility score (0-100)
        `;

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are an accessibility auditing assistant." },
                    { role: "user", content: promptText }
                ],
                temperature: 0.5
            });

            return response.choices[0].message?.content || "No response from OpenAI.";
        } catch (error) {
            console.error('Error analyzing with OpenAI:', error);
            throw new Error('Failed to analyze page with OpenAI.');
        }
    }

    public async checkAccessibility(): Promise<void> {
        console.log('Starting accessibility check...');

        const snapshot = await this.capturePageSnapshot();

        const snapshotsDir = path.join(process.cwd(), 'accessibility-snapshots');
        if (!fs.existsSync(snapshotsDir)) {
            fs.mkdirSync(snapshotsDir, { recursive: true });
        }

        const fileName = `snapshot_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
        fs.writeFileSync(
            path.join(snapshotsDir, fileName),
            JSON.stringify(snapshot, null, 2)
        );

        const analysis = await this.analyzeWithAI(snapshot);

        fs.writeFileSync(
            path.join(snapshotsDir, `analysis_${fileName.replace('.json', '.txt')}`),
            analysis
        );

        console.log('Accessibility analysis completed. Results saved in:', snapshotsDir);
        console.log('\nAnalysis Summary:\n');
        console.log(analysis);
    }
}

// Helper function to use in tests
export async function verifyAccessibility(page: Page): Promise<void> {
    const checker = new AccessibilityAIChecker(page);
    await checker.checkAccessibility();
}
