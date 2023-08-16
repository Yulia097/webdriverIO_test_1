const { remote } = require('webdriverio');

describe('Subscription Test', () => {
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

  it('should log in, subscribe to a user, and verify subscription status', async () => {
    const username = 'testforqaq';
    const password = 'test12345';

    await browser.url('https://pixabay.com');

    // Login
    const loginButton = await browser.$('//span[normalize-space()="Log in"]');
    await loginButton.click();

    const usernameInput = await browser.$('//input[@name="login_user"]');
    const passwordInput = await browser.$('//input[@name="login_pass"]');
    await usernameInput.setValue(username);
    await passwordInput.setValue(password);

    const submitButton = await browser.$(
      '//button[@class="loginButton--cVPDu e2e-auth-login-submit-button base--o-Oap primary--uRlHk"]'
    );
    await submitButton.click();

    // Wait for successful login
    await browser.waitUntil(
      async () => await browser.$('img[alt="User Profile Image"]').isExisting(),
      {
        timeout: 60000,
        timeoutMsg: 'Timeout waiting for user to log in'
      }
    );
    console.log('User logged in successfully');

    // Navigate to a user's profile and subscribe
    await browser.url('https://pixabay.com/users/username'); // Replace 'username' with the actual username
    const subscribeButton = await browser.$(
      'button[class="follow--h2qlj buttonBase--r4opq tertiaryButton--+4ehJ base--jzyee light--uBcBI"] span[class="label--Ngqjq"]'
    );
    await subscribeButton.click();

    // Wait for subscription status change
    await browser.waitUntil(
      async () => {
        const buttonLabel = await subscribeButton.getText();
        return buttonLabel === 'Following';
      },
      {
        timeout: 80000,
        timeoutMsg: 'Subscription status did not change within 80 seconds'
      }
    );
    console.log('User subscribed successfully');
  });
});
