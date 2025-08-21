import { chromium, FullConfig } from '@playwright/test'
import dotenv from 'dotenv';


async function globalSetup(config: FullConfig) {
dotenv.config();
  const browser = await chromium.launch();
  
  const context = await browser.newContext();
    try {
        await context.tracing.start({ screenshots: true, snapshots: true });
        
    }catch (error) {
        await context.tracing.stop({
          path: './test-results/failed-setup-trace.zip',
        });
        console.log(error);
}
}
export default globalSetup;