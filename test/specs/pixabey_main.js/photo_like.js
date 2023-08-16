const { remote } = require('webdriverio');

describe('Photo Like Test', () => {
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

  it('should log in and like a photo with specified username and password', async () => {
    const username = 'testforqaq';
    const password = 'test12345';

    await browser.url('https://pixabay.com');

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

    await browser.waitUntil(
      async () => {
        const isLoggedIn = await browser
          .$('//img[@alt="u_9sa10i8va1"]')
          .isExisting();
        return isLoggedIn;
      },
      {
        timeout: 60000,
        timeoutMsg: 'Timeout waiting for user to log in'
      }
    );

    console.log('User logged in successfully');

    await browser.url('https://pixabay.com');
    const photoLocator = await browser.$(
      '//div[@class="verticalMasonry--RoKfF lg--v7yE8"]//div[1]//div[1]//div[1]//div[1]//div[1]'
    );
    await photoLocator.click();

    const likeButton = await browser.$(
      '//button[@class="squareIconAndTextButton--LErXp light--uBcBI base--jzyee light--uBcBI"]'
    );
    await likeButton.click();

    await browser.waitUntil(
      async () => {
        const buttonColor = await likeButton.getCSSProperty('color');
        return buttonColor.parsed.hex === '#00ab6b';
      },
      {
        timeout: 80000,
        timeoutMsg: 'Like button color did not change within 80 seconds'
      }
    );
  });
});

//00ab6b - color of the btn
// - стан кнопки
// switch between pages
// share photo with facebook
