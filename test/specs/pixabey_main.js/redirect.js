const { remote } = require('webdriverio');
const assert = require('assert');

describe('Redirect Test', () => {
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

  it('should redirect to another page after clicking a button', async () => {
    await browser.url('https://pixabay.com/');
    const locator = await browser.$('//span[normalize-space()="Photos"][1]');

    await locator.click();

    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl === 'https://pixabay.com/photos/';
      },
      {
        timeout: 5000,
        timeoutMsg: 'Error'
      }
    );

    const currentUrl = await browser.getUrl();
    assert.strictEqual(
      currentUrl,
      'https://pixabay.com/photos/',
      'No redirection'
    );
    console.log(currentUrl);
  });
});
