import { expect, Locator, Page, test } from '@playwright/test';
import { TIMEOUT } from 'dns';
import {queryDatabase } from '../utils/oracleDb'
import { A11y } from '../utils/axe-a11y';


export class ReelPage {

    readonly page: Page
    
    constructor(page: Page) {
        this.page = page;

    }
    public async addRecipient() {
        await test.step('Add Recipient Manually', async () => {
            await this.page.locator('span').filter({ hasText: 'Recommandé électronique' }).click();
            await this.page.getByRole('button', { name: 'CONTINUER' }).click();
            await this.page.locator('mypost-reel-choice-item').filter({ hasText: 'Ajouter un ou plusieurs' }).locator('div').nth(1).click();
            await this.page.getByPlaceholder('Saisir le nom de la société (').click();
            await this.page.getByPlaceholder('Saisir le nom de la société (').fill('This is automation');
            await this.page.getByPlaceholder('Saisir le nom de la société (').press('Tab');
            await this.page.getByPlaceholder('Saisir le nom du service').fill('In TypeScript');
            await this.page.getByPlaceholder('Saisir l\'e-mail').click();
            await this.page.getByPlaceholder('Saisir l\'e-mail').fill('testing.factory@post.lu');
            await this.page.pause();
            await this.page.getByText('+ AJOUTER LE DESTINATAIRE').click();
            await this.page.waitForLoadState("networkidle");


            //await this.page.getByText('+ AJOUTER LE DESTINATAIRE').click();
            //await expect(this.page.getByText('Destinataire(s) ajouté(s)Soci')).toBeVisible();
            //}).toPass();
        });
    }
    public async addFilePdf() {
        await test.step('Add the PDF file', async () => {
            await this.page.getByText('SUIVANT').click();
            await this.page.waitForTimeout(1000);
            await this.page.getByText('IMPORTER LE(S) DOCUMENT(S) PDF').setInputFiles('C:\\Users\\x098929\\lste-playwright\\RJSILVA\\TestFiles\\You2.pdf');
            await this.page.waitForLoadState("networkidle");
            await this.page.waitForTimeout(1000);
            //await this.page.getByText('+ AJOUTER LE DESTINATAIRE').click();
            //await expect(this.page.getByText('Destinataire(s) ajouté(s)Soci')).toBeVisible();
            //}).toPass();
        });
    }
    

    public async luxtrustPayment() {
        await test.step('Go through LuxTrust and Payment', async () => {
        
        await this.page.getByText('AUTHENTIFIER').click();
        await this.page.locator('.mock > .img').click();
        await this.page.waitForLoadState("networkidle");
        await this.page.getByRole('button', { name: 'Send' }).click();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Valider et payer' }).click();
        await expect(this.page.getByText('Payer avec une carte bancaire')).toBeVisible();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('button', { name: 'Valider' }).click();
        await expect(this.page.getByText('Paiement réalisé avec succès')).toBeVisible();
        await expect(this.page.getByText('Votre commande a bien été')).toBeVisible();
    });
}


        public async addExcelRecipient() {
            await test.step('Add Recipients with an Excel File', async () => {
            await this.page.locator('span').filter({ hasText: 'Recommandé électronique' }).click();
            await this.page.getByRole('button', { name: 'CONTINUER' }).click();
            await this.page.locator('mypost-reel-choice-item').filter({ hasText: 'Ajouter des destinataires à l' }).locator('div').nth(1).click();
            await this.page.locator('#excel-import-button').isVisible();
            await this.page.waitForLoadState("networkidle");
            await this.page.locator('#excel-import-button').setInputFiles('C:\\Users\\x098929\\lste-playwright\\RJSILVA\\TestFiles\\Import_data.xlsx');
            await this.page.getByRole('button', { name: 'SUIVANT' }).click();
            await expect(this.page.getByText('L\'import de vos destinataires')).toBeVisible();
            await this.page.waitForLoadState("networkidle");
            await this.page.waitForTimeout(1000);
            
        });
        }

      
    }
