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

    console.log('Clicking on the login button');
    const loginButton = await browser.$('//span[normalize-space()="Log in"]');
    await loginButton.click();

    await browser.waitUntil(
      async () => {
        console.log('Entering username and password');
        const usernameInput = await browser.$('//input[@name="login_user"]');
        const passwordInput = await browser.$('//input[@name="login_pass"]');
        await usernameInput.setValue('testforqaq');
        await passwordInput.setValue('test12345');
        return true;
      },
      {
        timeout: 5000,
        timeoutMsg: 'Timeout while entering username and password'
      }
    );

    console.log('Clicking on the submit button');
    const submitButton = await browser.$(
      '//button[@class="loginButton--cVPDu e2e-auth-login-submit-button base--o-Oap primary--uRlHk"]'
    );
    await submitButton.click();

    await browser.waitUntil(
      async () => {
        console.log('Waiting for user to log in');
        const doesExist = await browser
          .$(
            'button[class="loginButton--uIEF2 buttonBase--r4opq tertiaryButton--+4ehJ base--jzyee dark--jRuwC"] span[class="label--Ngqjq"]'
          )
          .isExisting();
        return doesExist;
      },
      {
        timeout: 30000,
        timeoutMsg: 'Timeout waiting for user to log in'
      }
    );

    console.log('User logged in successfully');
  });
});
