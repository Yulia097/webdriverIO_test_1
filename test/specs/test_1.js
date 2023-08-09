const { remote } = require('webdriverio');
const assert = require('assert');

describe('Logo Click Test', () => {
  let browser;

  before(async () => {
    // 1. Ініціалізація браузера перед початком тестування
    browser = await remote({
      capabilities: {
        browserName: 'chrome'
      }
    });
  });

  after(async () => {
    await browser.deleteSession();
  });

  describe('terms & conditons click functionality', () => {
    it('should navigate to the home page after clicking the logo', async () => {
      await browser.url('https://pixabay.com/');
      const locator = await browser.$(
        '//a[contains(text(), "Terms of Service")]'
      );

      await locator.click();
      await browser.waitUntil(
        async () => {
          const currentURL = await browser.getUrl();
          return currentURL !== 'https://pixabay.com/'; // Replace 'initialURL' with the initial URL before clicking the element
        },
        {
          timeout: 10000,
          timeoutMsg: 'Navigation did not complete within 5 seconds'
        }
      );

      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://pixabay.com/service/terms/');
    });
  });
});
