import { test as setup, expect } from '@playwright/test';
import { stringify } from 'node:querystring';

const authFile = './TestFiles/auth/session.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://uat.mypost.lu/myaccount-web/dashboard');
  await page.getByLabel('Je me connecte à mon compte').click();
  await page.waitForLoadState("networkidle");
  await page.getByPlaceholder('Your e-mail address').click();
  await page.getByPlaceholder('Your e-mail address').fill('ricardo.silva@ext.post.lu');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Your password').fill('Post2025');
  await page.getByPlaceholder('Your password').press('Enter');
  await page.waitForTimeout(1000);
  await page.waitForLoadState("networkidle");
  await page.context().storageState({ path: authFile });
  await page.waitForTimeout(1500);
  console.log(authFile);
});