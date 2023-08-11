const { remote } = require('webdriverio');

describe('Login Test', () => {
  let browser;

  before(async () => {
    browser = await remote({
      capabilities: {
        browserName: 'chrome'
      }
    });
  });

  after(async () => {
    await browser.deleteSession();
  });

  it('should log in with specified username and password', async () => {
    await browser.url('https://pixabay.com');

    console.log('Clicking on the login button...');
    const loginButton = await browser.$('//span[normalize-space()="Log in"]');
    await loginButton.click();

    console.log('Entering username and password...');
    const usernameInput = await browser.$('//input[@name="login_user"]');
    const passwordInput = await browser.$('//input[@name="login_pass"]');
    await usernameInput.setValue('testforqaq');
    await passwordInput.setValue('test12345');

    console.log('Clicking on the submit button...');
    const submitButton = await browser.$(
      '//button[@class="loginButton--cVPDu e2e-auth-login-submit-button base--o-Oap primary--uRlHk"]'
    );
    await submitButton.click();

    console.log('Waiting for user to log in...');
    const loggedInElement = await browser.$('//img[@alt="u_9sa10i8va1"]');
    await browser.waitUntil(async () => await loggedInElement.isExisting(), {
      timeout: 30000,
      timeoutMsg: 'User did not log in within 20 seconds'
    });
  });
});
