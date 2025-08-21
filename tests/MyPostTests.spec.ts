import { test } from '../pages/mypost-fixture';
import { AccessibilityAIChecker } from '../utils/aiFunc-a11y';


test('Packup - Unset packup home / Set Packup Home', async ({ myPostPage, luxIdPage, myPostPackup, a11y, screenshooter }) => {
  
  await myPostPackup.deletePackup();
  await myPostPackup.activatePackupHome();

})
/*
test('Navigate to URL and do an accessibility report', async ({ myPostPage, luxIdPage, myPostPackup, a11y, accessibilityAIChecker }) => {

  await myPostPage.goToPage('https://uat.post.lu');
 // await a11y.runAccessibilityScanAsStep();
  await accessibilityAIChecker.checkAccessibility();

})
*/
test('Navigate to Telecom - Navigation Testing / File download', async ({ myPostPage, luxIdPage, myPostPackup, a11y }) => {

  await myPostPage.navigateelsewhere1();

})


test('AFFEL - Send multiple options - Luxembourg', async ({myPostPackup}) => {
  

  await myPostPackup.affelBuyAllLux();

})

test('AFFEL - Send multiple options - Portugal', async ({ myPostPackup }) => {
  

  await myPostPackup.affelBuyAllPor();

})