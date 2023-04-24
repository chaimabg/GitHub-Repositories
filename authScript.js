const EMAIL = 'lighthouseci.test@yopmail.com' 
const PASSWORD = 'a' 
const LOGIN_URL = "https://appdev4.expensya.com/Portal/#/Login"

module.exports = async (browser, { url }) => {

     // This login script is run for every URL so check if the user is already authenticated and if so then
    // return early without doing anything.

    if (url !== LOGIN_URL) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1024, height: 600 });
        await page.goto(LOGIN_URL);

        // Wait for the email input selector to load
        await page.waitForSelector('#email', {
            visible: true,
        });

        // Refuse Cookies
        const [refuseCookiesButton] = await page.$x("//button[contains(text(), 'Reject')]");
        if (refuseCookiesButton) {
            await refuseCookiesButton.click();
        }

        // Enter the username and password and login
        const emailInput = await page.$('input[name=Email]');
        await emailInput.type(EMAIL);

        const passwordInput = await page.$('input[name=Password]');
        await passwordInput.type(PASSWORD);

        const loginButton = await page.$('#login-btn');
        await loginButton.click();

        await page.waitForNavigation({ waitUntil: 'networkidle2' }) // No more then 2 network requests for half a second
        await page.close();
    }
    
    return;
};