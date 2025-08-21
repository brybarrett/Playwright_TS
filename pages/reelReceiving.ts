import { expect, Locator, Page, test } from '@playwright/test';
import { TIMEOUT } from 'dns';
import {queryDatabase } from '../utils/oracleDb'


export class ReelReceiving {

    readonly page: Page
    
    constructor(page: Page) {
        this.page = page;
    }
        public async queryDb() {
            const value =  (await queryDatabase("SELECT TOKEN FROM MYPOST_ERM.REEL_TOKEN ORDER BY CREATION_DATE DESC NULLS LAST FETCH NEXT 1 ROWS ONLY",[],"mypost_erm"));
            return value;
        }
        public async contructURL(): Promise<void> {
            const value = await this.queryDb();
             const URL = ("https://uat.mypost.lu/reel-web-public/web/receive?token="+ value + "&lang=en");
             await this.page.goto(URL);
             
        }

        public async acceptREEL(): Promise<void> {

             await this.page.locator('.pt-overlay').click();
             await this.page.waitForLoadState("networkidle");
             await this.page.getByText('Connecteur mock').click();
             await this.page.waitForTimeout(1000);
             await this.page.getByRole('button', { name: 'Send' }).click();
             await this.page.getByRole('button', { name: 'Accept the registered letter' }).click();
             await this.page.getByText('I am the addressee or I am').click();
             await this.page.getByRole('button', { name: 'Confirm' }).click();
             const downloadPromise = this.page.waitForEvent('download');
             await this.page.locator('a').filter({ hasText: 'You2.pdf' }).click();
             const download = await downloadPromise;
             await expect(this.page.getByText('Documents')).toBeVisible();
        }

        public async refuseREEL(): Promise<void> {

             await this.page.locator('.pt-overlay').click();
             await this.page.waitForLoadState("networkidle");
             await this.page.getByText('Connecteur mock').click();
             await this.page.waitForTimeout(1000);
             await this.page.getByRole('button', { name: 'Send' }).click();
             await this.page.getByRole('button', { name: 'Refuse the registered letter' }).click();
             await this.page.pause();
             await this.page.getByText('I am the addressee or I am').click();
             await this.page.getByRole('button', { name: 'Confirm' }).click();
             await expect(this.page.getByText('This registered mail has been')).toBeVisible();
        }
    }
