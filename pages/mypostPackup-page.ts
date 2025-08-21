import { expect, Locator, Page, test } from '@playwright/test';
import { queryMongoDB1 } from '../utils/mongoDb'

export class MyPostPackup {

    readonly acceptMyPostCookies: Locator;
    readonly firstTile: Locator;
    readonly page: Page


    constructor(page: Page) {
        this.page = page;
      this.acceptMyPostCookies = this.page.getByRole('button', { name: 'Ok, j’accepte' });
        this.firstTile = this.page.locator('span').filter({ hasText: /^Achetez et imprimez vos affranchissements depuis chez vous !$/ });

    }

    public async activatePackupHome() {
        
        await test.step('Validate dashboard', async () => {
    
                //await expect(async () => {
                
            await this.page.goto('https://uat.mypost.lu/myaccount-web/dashboard');
                await this.acceptMyPostCookies.click();
                await this.page.pause();
                await this.page.waitForLoadState("networkidle");
                await expect(this.firstTile).toBeVisible();
                await this.page.waitForTimeout(500);
                await this.page.locator('#main-section').getByText('PackUp').click();               
                await this.page.getByText('PackUp Home').click();
                await this.page.getByRole('button', { name: 'ACTIVER' }).click();
                await this.page.locator('#checkbox').check();
                await this.page.getByRole('button', { name: 'Porte d\'entrée ' }).click();
                await this.page.getByRole('button', { name: 'Confirmer' }).click();
                await this.page.getByRole('button', { name: 'ACTIVER PACKUP HOME' }).click();
                await expect(this.page.getByText('Mon PackUp Home')).toBeVisible();
                await this.page.getByText('Porte d\'entrée').click();
                //}).toPass();

            });
               
    }

    
    public async affelBuyAllLux() {
        
        await test.step('Validate dashboard', async () => {
    
                //await expect(async () => {
                
            await this.page.goto('https://uat.mypost.lu/myaccount-web/dashboard');
                await this.acceptMyPostCookies.click();
                await this.page.pause();
                await this.page.waitForLoadState("networkidle");
                await expect(this.firstTile).toBeVisible();
                await this.page.locator('.pt-bubble > .pi-mail-laptop-box').click();
                await this.page.locator('.infos-package').first().click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                await this.page.waitForTimeout(900);
                await this.page.locator('.infos-package').first().click();
                await this.page.locator('#product-S-price').getByText('€').click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                                await this.page.waitForTimeout(900);
                await this.page.locator('.infos-package').first().click();
                await this.page.locator('#product-M-price').getByText('€').click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                                await this.page.waitForTimeout(900);
                await this.page.locator('.infos-package').first().click();
                await this.page.getByText('Format L 7.20 €L ≤ 600 mmL +').click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                                await this.page.waitForTimeout(900);
                await this.page.locator('.infos-package').first().click();
                await this.page.getByText('Petit Colis 2 kg 6.00 €L : ≤').click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('spinbutton').click();
                await this.page.getByRole('spinbutton').fill('2');
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'SAISIR LE DESTINATAIRE' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).fill('MR');
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).fill('Mation');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le prénom' }).fill('Auto');
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.keyboard.press('9');
                await this.page.keyboard.press('9');
                                await this.page.keyboard.press('9');
                                                await this.page.keyboard.press('9');
                                                                await this.page.keyboard.press('Tab');
        

                await this.page.pause();
                                await this.page.waitForTimeout(2000);
                                                await this.page.pause();
            
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).fill('2');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).press('Enter');
                await this.page.getByRole('textbox', { name: 'Saisir le complément' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro de TVA' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).fill('auto_mation@yahoooooo.lu');
                await this.page.getByRole('button', { name: 'ENREGISTRER' }).click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                                await this.page.waitForTimeout(900);
                await this.page.locator('.infos-package').first().click();
                await this.page.getByText('Colis 10 kg 9.00 €L : ≤ 1,50').click();
                await this.page.getByRole('spinbutton').click();
                await this.page.getByRole('spinbutton').fill('2');
                await this.page.getByText('Ajouter au panier').first().click();
                                await this.page.getByRole('link', { name: 'SAISIR LE DESTINATAIRE' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).fill('MR');
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).fill('Mation');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le prénom' }).fill('Auto');
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.keyboard.press('9');
                await this.page.keyboard.press('9');
                                await this.page.keyboard.press('9');
                                                await this.page.keyboard.press('9');
                                                                await this.page.keyboard.press('Tab');
        

                await this.page.pause();
                                await this.page.waitForTimeout(2000);
                                                await this.page.pause();
            
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).fill('2');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).press('Enter');
                await this.page.getByRole('textbox', { name: 'Saisir le complément' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro de TVA' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).fill('auto_mation@yahoooooo.lu');
                await this.page.getByRole('button', { name: 'ENREGISTRER' }).click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                                await this.page.waitForTimeout(900);
                                await this.page.locator('.infos-package').first().click();
                await this.page.getByText('Colis 30 kg 22.00 €L : ≤ 1,50').click();
                await this.page.getByRole('spinbutton').click();
                await this.page.getByRole('spinbutton').fill('2');
                await this.page.getByText('Ajouter au panier').first().click();
                                await this.page.getByRole('link', { name: 'SAISIR LE DESTINATAIRE' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).fill('MR');
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).fill('Mation');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le prénom' }).fill('Auto');
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.keyboard.press('9');
                await this.page.keyboard.press('9');
                                await this.page.keyboard.press('9');
                                                await this.page.keyboard.press('9');
                                                                await this.page.keyboard.press('Tab');
        

                await this.page.pause();
                                await this.page.waitForTimeout(2000);
                                                await this.page.pause();
            
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).fill('2');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).press('Enter');
                await this.page.getByRole('textbox', { name: 'Saisir le complément' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro de TVA' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).fill('auto_mation@yahoooooo.lu');
                await this.page.getByRole('button', { name: 'ENREGISTRER' }).click();
                await this.page.getByText('Ajouter au panier').first().click();
                                await this.page.waitForTimeout(900);

                                await this.page.locator('a').filter({ hasText: 'SUIVANT' }).click();

                                await this.page.getByText('Je déclare avoir pris').click({ position: { x: 0, y: 0 } });
                                await this.page.getByRole('button', { name: 'SUIVANT' }).click();
                                await this.page.getByRole('button', { name: 'OK, J\'AI BIEN COMPRIS' }).click();
                                await this.page.getByRole('button', { name: 'Valider' }).click()
                                await expect(this.page.getByText('Votre paiement a bien été')).toBeVisible();
                                await expect(this.page.getByText('Format S')).toBeVisible();
                                await expect(this.page.getByText('Format M')).toBeVisible();;
                                await expect(this.page.getByText('Format XS')).toBeVisible();
                                await expect(this.page.getByText('Colis 10 kg')).toBeVisible();
                                await expect(this.page.getByText('Format L')).toBeVisible();
                                await expect(this.page.getByText('Petit Colis 2 kg')).toBeVisible();
            });
               
    }

    public async affelBuyAllPor() {
        
        await test.step('Validate dashboard', async () => {
    
                //await expect(async () => {
                
            await this.page.goto('https://uat.mypost.lu/myaccount-web/dashboard');
                await this.acceptMyPostCookies.click();
                await this.page.pause();
                await this.page.waitForLoadState("networkidle");
                await expect(this.firstTile).toBeVisible();
                await this.page.locator('.pt-bubble > .pi-mail-laptop-box').click();
                await this.page.locator('.infos-package').first().click();
await this.page.getByRole('textbox', { name: 'Rechercher...' }).click();
            await this.page.getByRole('textbox', { name: 'Rechercher...' }).fill('por');
            await this.page.getByRole('list').getByText('Portugal', { exact: true }).click();

                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                await this.page.waitForTimeout(900);
                await this.page.locator('.infos-package').first().click();

                await this.page.getByRole('textbox', { name: 'Rechercher...' }).click();
            await this.page.getByRole('textbox', { name: 'Rechercher...' }).fill('por');
            await this.page.getByRole('list').getByText('Portugal', { exact: true }).click();

                await this.page.locator('#product-S-price').getByText('€').click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                                await this.page.waitForTimeout(900);
                await this.page.locator('.infos-package').first().click();

                await this.page.getByRole('textbox', { name: 'Rechercher...' }).click();
            await this.page.getByRole('textbox', { name: 'Rechercher...' }).fill('por');
            await this.page.getByRole('list').getByText('Portugal', { exact: true }).click();

                await this.page.locator('#product-M-price').getByText('€').click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                                await this.page.waitForTimeout(900);
                await this.page.locator('.infos-package').first().click();

                await this.page.getByRole('textbox', { name: 'Rechercher...' }).click();
            await this.page.getByRole('textbox', { name: 'Rechercher...' }).fill('por');
            await this.page.getByRole('list').getByText('Portugal', { exact: true }).click();

                await this.page.getByText('Format L ').click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                                await this.page.waitForTimeout(900);
                await this.page.locator('.infos-package').first().click();

                await this.page.getByRole('textbox', { name: 'Rechercher...' }).click();
            await this.page.getByRole('textbox', { name: 'Rechercher...' }).fill('por');
            await this.page.getByRole('list').getByText('Portugal', { exact: true }).click();

                await this.page.getByText('Petit Colis 2 kg').click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('spinbutton').click();
                await this.page.getByRole('spinbutton').fill('2');
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'SAISIR LE DESTINATAIRE' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).fill('MR');
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).fill('Mation');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le prénom' }).fill('Auto');
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.keyboard.press('9');
                await this.page.keyboard.press('9');
                                await this.page.keyboard.press('9');
                                                await this.page.keyboard.press('9');
                                                                await this.page.keyboard.press('Tab');
        

                await this.page.pause();
                                await this.page.waitForTimeout(2000);
                                                await this.page.pause();
            await this.page.getByRole('textbox', { name: 'Saisir la localité' }).fill('2');
            await this.page.getByRole('textbox', { name: 'Saisir la rue' }).fill('2');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).fill('2');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).press('Enter');
                await this.page.getByRole('textbox', { name: 'Saisir le complément' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro de TVA' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).fill('auto_mation@yahoooooo.lu');
                await this.page.getByRole('button', { name: 'ENREGISTRER' }).click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                                await this.page.waitForTimeout(900);
                await this.page.locator('.infos-package').first().click();

await this.page.getByRole('textbox', { name: 'Rechercher...' }).click();
            await this.page.getByRole('textbox', { name: 'Rechercher...' }).fill('por');
            await this.page.getByRole('list').getByText('Portugal', { exact: true }).click();

                await this.page.getByText('Colis 10 kg ').click();
                await this.page.getByRole('spinbutton').click();
                await this.page.getByRole('spinbutton').fill('2');
                await this.page.getByText('Ajouter au panier').first().click();
                                await this.page.getByRole('link', { name: 'SAISIR LE DESTINATAIRE' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).fill('MR');
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).fill('Mation');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le prénom' }).fill('Auto');
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.keyboard.press('9');
                await this.page.keyboard.press('9');
                                await this.page.keyboard.press('9');
                                                await this.page.keyboard.press('9');
                                                                await this.page.keyboard.press('Tab');
        

                await this.page.pause();
                                await this.page.waitForTimeout(2000);
                                                await this.page.pause();
                        await this.page.getByRole('textbox', { name: 'Saisir la localité' }).fill('2');
            await this.page.getByRole('textbox', { name: 'Saisir la rue' }).fill('2');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).fill('2');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).press('Enter');
                await this.page.getByRole('textbox', { name: 'Saisir le complément' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro de TVA' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).fill('auto_mation@yahoooooo.lu');
                await this.page.getByRole('button', { name: 'ENREGISTRER' }).click();
                await this.page.getByText('Ajouter au panier').first().click();
                await this.page.getByRole('link', { name: 'AJOUTER UN AUTRE' }).click();
                                await this.page.waitForTimeout(900);
                                await this.page.locator('.infos-package').first().click();

await this.page.getByRole('textbox', { name: 'Rechercher...' }).click();
            await this.page.getByRole('textbox', { name: 'Rechercher...' }).fill('por');
            await this.page.getByRole('list').getByText('Portugal', { exact: true }).click();

                await this.page.getByText('Colis 30 kg').click();
                await this.page.getByRole('spinbutton').click();
                await this.page.getByRole('spinbutton').fill('2');
                await this.page.getByText('Ajouter au panier').first().click();
                                await this.page.getByRole('link', { name: 'SAISIR LE DESTINATAIRE' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).fill('MR');
                await this.page.getByRole('textbox', { name: 'Saisir le titre' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).fill('Mation');
                await this.page.getByRole('textbox', { name: 'Saisir le nom' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le prénom' }).fill('Auto');
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir le code postal' }).click();
                await this.page.keyboard.press('9');
                await this.page.keyboard.press('9');
                                await this.page.keyboard.press('9');
                                                await this.page.keyboard.press('9');
                                                                await this.page.keyboard.press('Tab');
        

                await this.page.pause();
                                await this.page.waitForTimeout(2000);
                                                await this.page.pause();
                        await this.page.getByRole('textbox', { name: 'Saisir la localité' }).fill('2');
            await this.page.getByRole('textbox', { name: 'Saisir la rue' }).fill('2');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).fill('2');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro', exact: true }).press('Enter');
                await this.page.getByRole('textbox', { name: 'Saisir le complément' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir le numéro de TVA' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).press('Tab');
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).click();
                await this.page.getByRole('textbox', { name: 'Saisir l\'e-mail' }).fill('auto_mation@yahoooooo.lu');
                await this.page.getByRole('button', { name: 'ENREGISTRER' }).click();
                await this.page.getByText('Ajouter au panier').first().click();
                                await this.page.waitForTimeout(900);

                                await this.page.locator('a').filter({ hasText: 'SUIVANT' }).click();

                                await this.page.getByText('Je déclare avoir pris').click({ position: { x: 0, y: 0 } });
                                await this.page.getByRole('button', { name: 'SUIVANT' }).click();
                                await this.page.getByRole('button', { name: 'OK, J\'AI BIEN COMPRIS' }).click();
                                await this.page.getByRole('button', { name: 'Valider' }).click()
                                await expect(this.page.getByText('Votre paiement a bien été')).toBeVisible();
                                await expect(this.page.getByText('Format S')).toBeVisible();
                                await expect(this.page.getByText('Format M')).toBeVisible();;
                                await expect(this.page.getByText('Format XS')).toBeVisible();
                                await expect(this.page.getByText('Colis 10 kg')).toBeVisible();
                                await expect(this.page.getByText('Colis 30 kg')).toBeVisible();
                                await expect(this.page.getByText('Format L')).toBeVisible();
                                await expect(this.page.getByText('Petit Colis 2 kg')).toBeVisible();
            });
               
    }

    public async deletePackup() {
        const userName = await queryMongoDB1('packup');
    }
    

}