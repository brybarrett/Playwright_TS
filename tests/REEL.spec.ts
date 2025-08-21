import { test } from '../pages/mypost-fixture';
import { expect } from '@playwright/test';
import { MyPostPage } from '../pages/mypost-page';


test('REEL - Send a REEL Excel Import', async ({ myPostPage,  reelPage, a11y }) => {

  await myPostPage.navigateToReel();
 //
 //  await a11y.runAccessibilityScanAsStep();
  await reelPage.addExcelRecipient();
  await reelPage.addFilePdf();
  await reelPage.luxtrustPayment();

  
});

test('REEL - Accept Reel', async ({ reelReceiving }) => {
  await reelReceiving.contructURL();
  await reelReceiving.acceptREEL();

});

test('REEL - Send a REEL Manually Add', async ({ myPostPage, reelPage }) => {

  await myPostPage.navigateToReel();
  await reelPage.addRecipient();
  await reelPage.addFilePdf();
  await reelPage.luxtrustPayment();

  
});

test('REEL - Refuse Reel', async ({ reelReceiving }) => {
  await reelReceiving.contructURL();
  await reelReceiving.refuseREEL();

});
