const { remote } = require('webdriverio');

describe('Login with Google Test', () => {
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

  it('should log in with Google successfully on Pixabay', async () => {
    await browser.url('https://pixabay.com/');

    await browser.waitUntil(
      async () => {
        const googleLoginButton = await browser.$(
          'button[class="button--Xk14x google--xxLcM"]'
        );
        await googleLoginButton.click();

        const loggedInElement = await browser.$(
          '//ul[@class="pure-menu-children"]//a[contains(text(),"My profile")]'
        );
        expect(loggedInElement).toBeExisting();
      },
      {
        timeout: 5000,
        timeoutMsg: 'Timeout Error'
      }
    );
  });
});
