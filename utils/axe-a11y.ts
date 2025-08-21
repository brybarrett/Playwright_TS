// a11y.ts
import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

export class A11y {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async runAccessibilityScanAsStep(): Promise<void> {
    await test.step('Run accessibility scan with Axe', async () => {
      const results = await new AxeBuilder({ page: this.page }).analyze();

      // Optional: Log violations
      if (results.violations.length > 0) {
        console.warn('Accessibility Violations:');
        results.violations.forEach((v) => {
          console.warn(`❌ ${v.id} - ${v.description}`);
        });

        // Calculate percentages
        const total = results.passes.length + results.violations.length +
          results.incomplete.length + results.inapplicable.length;
        const passesPercent = (results.passes.length / total * 100).toFixed(1);
        const violationsPercent = (results.violations.length / total * 100).toFixed(1);
        const incompletePercent = (results.incomplete.length / total * 100).toFixed(1);
        const inapplicablePercent = (results.inapplicable.length / total * 100).toFixed(1);

        // Get URL and create filename
        const pageUrl = this.page.url();
        const urlForFilename = pageUrl.substring(0, Math.min(50, pageUrl.length)).replace(/[^a-z0-9]/gi, '_');
        const reportDir = path.join('./tests/a11y', urlForFilename);
        // Create directory if it doesn't exist
        if (!fs.existsSync(reportDir)) {
          fs.mkdirSync(reportDir, { recursive: true });
        }

        // Track which screenshots were successfully taken
        const screenshotsTaken = new Set<string>();

        // Take screenshots of violating elements
        for (const [vIndex, violation] of results.violations.entries()) {
          for (const [nIndex, node] of violation.nodes.entries()) {
            try {
              const selector = node.target.join(' ');
              const element = await this.page.$(selector);
              if (element) {
                const screenshotPath = path.join(reportDir, `violation-${vIndex}-${nIndex}.png`);
                const screenshotPromise = element.screenshot({ path: screenshotPath });
                const timeoutPromise = new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Screenshot timeout')), 200)
                );
                await Promise.race([screenshotPromise, timeoutPromise])
                  .then(() => {
                    screenshotsTaken.add(`${vIndex}-${nIndex}`);
                  })
                  .catch(error => {
                    console.warn(`Skipping screenshot for violation ${violation.id} - timeout exceeded`);
                  });
              }
            } catch (error) {
              console.warn(`Failed to take screenshot for violation ${violation.id}:`, error);
            }
          }
        }

        // Generate HTML report
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Accessibility Violations Report</title>
              <url>${pageUrl}</url>
              <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .violation, .pass { margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; }
                .violation-header { color: #d32f2f; }
                .pass-header { color: #4caf50; }
                .element { background: #f5f5f5; padding: 10px; margin: 5px 0; }
                .chart-container { width: 600px; height: 400px; margin: 20px auto; }
                .screenshot-section { margin: 10px 0; }
                .screenshot-toggle { cursor: pointer; color: blue; text-decoration: underline; }
                .screenshot { display: none; max-width: 600px; max-height: 400px; margin: 10px 0; }
                .screenshot.show { display: block; }
                .no-screenshot { color: #666; font-style: italic; }
              </style>
            </head>
            <body>
              <div>
                <h1>Accessibility Report</h1>
                
                <div class="chart-container">
                  <canvas id="statusChart"></canvas>
                </div>
                
                <script>
                  const ctx = document.getElementById('statusChart').getContext('2d');
                  new Chart(ctx, {
                    type: 'pie',
                    data: {
                      labels: ['Passes', 'Violations', 'Incomplete', 'Inapplicable'],
                      datasets: [{
                        data: [${passesPercent}, ${violationsPercent}, ${incompletePercent}, ${inapplicablePercent}],
                        backgroundColor: [
                          '#4caf50',
                          '#f44336',
                          '#ff9800',
                          '#9e9e9e'
                        ]
                      }]
                    },
                    options: {
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: 'Accessibility Checks Status Distribution (%)'
                        },
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }
                  });

                  function toggleScreenshot(id) {
                    const screenshot = document.getElementById(id);
                    screenshot.classList.toggle('show');
                  }
                </script>

             
                <h2>Violations (${results.violations.length})</h2>
                ${results.violations.map((violation, vIndex) => `
                  <div class="violation">
                    <h2 class="violation-header">${violation.id.replace(/[<>]/g, '')}</h2>
                    <p><strong>Description:</strong> ${violation.description.replace(/[<>]/g, '')}</p>
                    <p><strong>Impact:</strong> ${violation.impact}</p>
                    <p><strong>Help:</strong> ${violation.help.replace(/[<>]/g, '')}</p>
                    <p><strong>Help URL:</strong> <a href="${violation.helpUrl}">${violation.helpUrl.replace(/[<>]/g, '')}</a></p>
                    <h3>Violating Elements:</h3>
                    ${violation.nodes.map((node, nIndex) => `
                      <div class="element">
                        <p><strong>HTML:</strong> ${node.html}</p>
                        <p><strong>Target:</strong> ${JSON.stringify(node.target)}</p>
                        ${node.failureSummary ? `<p><strong>Failure Summary:</strong> ${node.failureSummary}</p>` : ''}
                        <div class="screenshot-section">
                          ${screenshotsTaken.has(`${vIndex}-${nIndex}`) ? `
                            <p class="screenshot-toggle" onclick="toggleScreenshot('screenshot-${vIndex}-${nIndex}')">Toggle Screenshot</p>
                            <img id="screenshot-${vIndex}-${nIndex}" class="screenshot" src="violation-${vIndex}-${nIndex}.png" alt="Violation Screenshot">
                          ` : `
                            <p class="no-screenshot">Screenshot not available for this violation</p>
                          `}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                `).join('')}
              </div>
            </body>
          </html>
        `;

        fs.writeFileSync(path.join(reportDir, `accessibility-report-${urlForFilename}.html`), htmlContent);

        // Generate JSON report
        const jsonReport = {
          url: pageUrl,
          timestamp: new Date().toISOString(),
          summary: {
            total,
            passes: {
              count: results.passes.length,
              percentage: parseFloat(passesPercent)
            },
            violations: {
              count: results.violations.length,
              percentage: parseFloat(violationsPercent)
            },
            incomplete: {
              count: results.incomplete.length,
              percentage: parseFloat(incompletePercent)
            },
            inapplicable: {
              count: results.inapplicable.length,
              percentage: parseFloat(inapplicablePercent)
            }
          },
          violations: results.violations.map(violation => ({
            id: violation.id,
            description: violation.description,
            impact: violation.impact,
            help: violation.help,
            helpUrl: violation.helpUrl,
            nodes: violation.nodes.map(node => ({
              html: node.html,
              target: node.target,
              failureSummary: node.failureSummary
            }))
          }))
        };
        // Path to the HTML report
        const htmlFilePath = path.join(reportDir, `accessibility-report-${urlForFilename}.html`);
        const pdfFilePath = path.join(reportDir, `accessibility-report-${urlForFilename}.pdf`);

        // Open HTML in a new browser context and print to PDF
        const context = await this.page.context().browser()?.newContext();
        if (context) {
          const pdfPage = await context.newPage();
          await pdfPage.goto('file://' + path.resolve(htmlFilePath), { waitUntil: 'load' });
          await pdfPage.pdf({
            path: pdfFilePath,
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
          });
          await pdfPage.close();
          await context.close();
        }
        fs.writeFileSync(
          path.join(reportDir, `accessibility-report-${urlForFilename}.json`),
          JSON.stringify(jsonReport, null, 2)
        );
      }
      console.log('this ended');
      // Assert no violations
    });
  }
}
