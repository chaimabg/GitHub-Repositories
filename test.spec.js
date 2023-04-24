const { chromium } = require('playwright');
const { playAudit } = require('playwright-lighthouse')
const uploadToLhciServer = require('helper.js');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

describe('Home Lighthouse report', () => {

    const chromiumDebugPort = 9222;
    const chromiumOptions = {
        slowMo: 0,
        chromiumSandbox: false,
        args: [`--remote-debugging-port=${chromiumDebugPort}`],
        headless: false
    };

    it('should pass home thresholds', async () => {
        try {
            const browser = await chromium.launch(chromiumOptions);
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://appdev4.expensya.com/Portal/#/Login');
            const lighthouseConfig = {
                page: page,
                port: chromiumDebugPort,
                thresholds: {
                    performance: 50,
                    accessibility: 50,
                    'best-practices': 50,
                    seo: 50,
                },
                reports: {
                    formats: {
                      html: true, 
                    },
                    name: `lighthouse-${new Date().getTime()}`, //defaults to `lighthouse-${new Date().getTime()}`
                    directory: `./lighthouse-report`, //defaults to `${process.cwd()}/lighthouse`
                  },
            };
            const result = await playAudit(lighthouseConfig);
            await uploadToLhciServer(result.lhr);
            await browser.close();
        } catch (err) {
            throw new Error(err);
        }
    });

});