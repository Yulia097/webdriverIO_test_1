const { remote } = require('webdriverio');

describe('Header Test', () => {
  let browser;

  before(async () => {
    // 1. Initialize the browser
    browser = await remote({
      capabilities: {
        browserName: 'chrome'
      }
    });
  });

  it('should open the correct page', async () => {
    // 2. Open the web page
    await browser.url('https://pixabay.com/');

    // 3. Verify that the page title contains the expected text
    const title = await browser.getTitle();
    await expect(title).toBe(
      'Stunning royalty-free images & royalty-free stock'
    );
  });
});
