import { test, Locator, Page } from '@playwright/test';
import { typePassword } from '../tests/type-password';

export class LuxIdPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    public async connectToLuxID() {


        await this.page.getByPlaceholder('Your e-mail address').click();
        await this.page.getByPlaceholder('Your e-mail address').fill('ricardo.silva@ext.post.lu');
        await this.page.getByRole('button', { name: 'Login' }).click();
        await this.page.getByPlaceholder('Your password').fill('Post2025');
        await this.page.getByPlaceholder('Your password').press('Enter');
        await this.page.pause()
              ;}
    }
