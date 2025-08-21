import { expect, Locator, Page } from '@playwright/test';
import { typePassword } from '../tests/type-password';
import { url } from 'inspector';

export class Screenshooter {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    public async takeCompareScreenshot() {
        await this.page.waitForLoadState('networkidle');

        const pageUrl = await this.page.url();
        const snapshotName = `${pageUrl.substring(0, 50)}.png`;       
         await this.page.waitForLoadState('domcontentloaded');
        // Take a screenshot and compare it with the custom snapshot
        await expect.soft(this.page).toHaveScreenshot(snapshotName, {
            fullPage: true,
            threshold: 0.1,
            maxDiffPixelRatio: 0.5
        });
    }}