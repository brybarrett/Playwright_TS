// specialHandling.ts
import { expect, Page } from '@playwright/test';

export class SpecialHandling {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

   public async popUps() {
    try {
      (await this.page.getByRole('button', { name: 'CONTINUER' }).isVisible()) ? 
        await this.page.getByRole('button', { name: 'CONTINUER' }).click() : console.warn('Panic! at the disco')
    
    } catch (e) {
      console.warn('Popup not found or not visible. Skipping special handling.');
    }
  }
}
