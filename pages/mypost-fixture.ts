import { test as base } from '@playwright/test';
import { MyPostPage } from './mypost-page';
import { LuxIdPage } from './luxid-page';
import { Screenshooter } from '../utils/screenshooter';
import { ReelPage } from './reelPage'
import { ReelReceiving } from './reelReceiving'
import { MyPostPackup } from './mypostPackup-page';
import { A11y } from '../utils/axe-a11y'
import { AccessibilityAIChecker } from '../utils/aiFunc-a11y';


// Declare the types of your fixtures.
type MyPostFixture = {
  myPostPage: MyPostPage;
  luxIdPage: LuxIdPage;
  screenshooter: Screenshooter;
  reelPage: ReelPage;
  reelReceiving: ReelReceiving;
  myPostPackup: MyPostPackup;
  a11y: A11y;
  accessibilityAIChecker: AccessibilityAIChecker;
};

export const test = base.extend<MyPostFixture>({
  myPostPage: async ({ page }, use) => {
    // Set up the fixture
    await use(new MyPostPage(page));
  },
  luxIdPage: async ({ page }, use) => {
    await use(new LuxIdPage(page));
  },
  screenshooter: async ({ page }, use) => {
    await use(new Screenshooter(page));
  },

  reelPage: async ({ page }, use) => {
    await use(new ReelPage(page))
  },
  reelReceiving: async ({ page }, use) => {
    await use(new ReelReceiving(page))
  },
  myPostPackup: async ({ page }, use) => {
    await use(new MyPostPackup(page))
  },
  a11y: async ({ page }, use) => {
    await use(new A11y(page))
  },
  accessibilityAIChecker: async ({ page }, use) => {
    await use(new AccessibilityAIChecker(page))
  },

});
export { expect } from '@playwright/test';