import { expect, Locator, Page, test } from '@playwright/test';
import { queryMongoDB1 } from '../utils/mongoDb'
import { SpecialHandling } from '../specialFunction/speacialFunc'
import {  } from '../utils/axe-a11y';

export class MyPostPage {
    readonly acceptCookies: Locator;
    readonly acceptCookiesBad: Locator;
    readonly acceptCookiesCss: Locator;
    readonly acceptCookiesId: Locator;
    readonly connectBtn: Locator;
    readonly acceptMyPostCookies: Locator;
    readonly firstTile: Locator;
    readonly page: Page
    errorLogs: { message: string }[];


    constructor(page: Page) {
        this.page = page;
        this.acceptCookies = this.page.getByRole('button', { name: 'Ok, j’accepte' });
        this.connectBtn = this.page.getByLabel('Je me connecte à mon compte');
        this.acceptCookiesBad = this.page.getByRole('button', { name: 'Ok, j’acsdsdfdzhgsdcepte' });
        this.acceptCookiesCss = this.page.locator('#onetrust-accept-btn-handler');
        this.acceptCookiesId = this.page.locator('id=onetrust-accept-btn-handler');
        this.acceptMyPostCookies = this.page.getByRole('button', { name: 'Ok, j’accepte' });
        this.firstTile = this.page.locator('span').filter({ hasText: /^Achetez et imprimez vos affranchissements depuis chez vous !$/ });
        this.page = page;
        this.errorLogs = []
    }

    public async goToLogin() {
        await test.step('Go to LuxId Login', async () => {
            await this.page.goto('/');
            //await this.acceptCookies.click();
            await this.connectBtn.click();
            await this.page.pause();

        })
    }
    public async goToPage(URL: string) {

        await test.step('Go to LuxId Login', async () => {
            await this.page.goto(URL);
        })
    }

    public async validateDashboard() {
        await test.step('Validate dashboard', async () => {

            //await expect(async () => {
            await this.acceptMyPostCookies.click();
            await expect(this.firstTile).toBeVisible();
            //}).toPass();
        });
    }
    public async navigateToReel() {
        await test.step('Validate dashboard', async () => {
            await this.page.goto('https://uat.mypost.lu/myaccount-web/dashboard');
            //await expect(async () => {
            await this.acceptMyPostCookies.click();
            await expect(this.firstTile).toBeVisible();
            await this.page.locator('.pt-bubble > .pi-erm').click();
            //}).toPass();
        });
    }

    public async navigateelsewhere1() {
        await test.step('Validate dashboard', async () => {
            
            await this.page.goto('https://uat.mypost.lu/myaccount-web/dashboard');
            await expect(this.firstTile).toBeVisible();
            const specialhandling = new SpecialHandling(this.page);
            await this.page.getByRole('button', { name: 'Ok, j’accepte' }).click();
            await this.page.locator('#main-section div').filter({ hasText: /^Mobile$/ }).first().click();
            await expect(this.page.getByText('830 634')).toBeVisible();
            await this.page.getByRole('link', { name: 'MES OPTIONS' }).click();
            await expect(this.page.getByText('ExtraVolume 5 GB')).toBeVisible();
            await this.page.getByRole('link', { name: 'MES FACTURES' }).click();
            const page1Promise = this.page.waitForEvent('popup');
            await this.page.getByText('CONTACTEZ-NOUS').click();
            const page1 = await page1Promise;
            await this.page.getByText('Menu').click();
            await this.page.getByText('Mon mode de prélèvement').click();
            await this.page.getByRole('button', { name: 'Continuer', exact: true }).click();
            await expect(this.page.getByText('Numéro de compte')).toBeVisible();
            await this.page.getByText('Menu').click();
            await this.page.locator('#post-menu--invoices').getByText('Mes factures').click();
            await this.page.getByRole('button', { name: ' RETOUR' }).click();
            await this.page.getByRole('link', { name: 'HISTORIQUE DE CONSOMMATION' }).click();
            await expect(this.page.locator('a').filter({ hasText: 'DERNIERS MOIS' })).toBeVisible();
            await this.page.getByText('Menu').click();
            await this.page.getByText('Carte SIM bloquée ?').click();
            await this.page.getByRole('link', { name: 'Forfait Internet' }).click();
            await this.page.locator('#contract-mobile--puk_code_lg a').click();
            await this.page.getByRole('button', { name: 'Fermer' }).click();
            await this.page.getByRole('list').click();
            await this.page.getByText('Mon mode de prélèvement').click();
        });
    }



    public async GardeExpOrder(): Promise<void> {
        await test.step('Validate dashboard', async () => {
            const specialhandling = new SpecialHandling(this.page);
            await this.page.getByRole('button', { name: 'Ok, j’accepte' }).click();
            await this.page.getByText('Garde & Réexpédition').nth(1).click();
            await this.page.getByRole('button', { name: '  Garde des envois PENDANT' }).click();
            await this.page.getByLabel('Début', { exact: true }).click();
            await this.page.getByRole('heading', { name: 'April' }).click();
            await this.page.getByRole('button', { name: 'November' }).click();
            await this.page.waitForLoadState("networkidle");
            await this.page.getByRole('button', { name: '13' }).click();
            await this.page.getByText('Je souhaite faire garder mon').click();
            await this.page.waitForLoadState("networkidle");
            await this.page.getByText('Mes envois seront livrés').click();
            await this.page.waitForLoadState("networkidle");
            await this.page.getByRole('button', { name: 'SUIVANT' }).click();
            await this.page.waitForTimeout(2000);
            await specialhandling.popUps();
            await this.page.waitForTimeout(1000);
            await this.page.getByRole('button', { name: 'SUIVANT' }).click();
            await this.page.waitForTimeout(1000);
            await this.page.locator('label').filter({ hasText: 'Je déclare avoir pris' }).click();
            await this.page.waitForTimeout(1000);
            await this.page.getByRole('button', { name: 'SUIVANT' }).click();
            await this.page.waitForTimeout(1000);
            await this.page.getByRole('button', { name: 'PAYER', exact: true }).click();
            await this.page.waitForTimeout(1000);
            await expect(this.page.getByText('Votre paiement a bien été')).toBeVisible();
            await expect(this.page.getByText('11.10 €')).toBeVisible();
            await expect(this.page.getByText('1.89 €')).toBeVisible();
        });
    }

}

