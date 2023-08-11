const { remote } = require('webdriverio');

describe('Header Elements Test', () => {
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

  it('should have logo element in the header', async () => {
    await browser.url('https://pixabay.com/');

    const logoElement = await browser.$('.logoSvg--iOWyY');
    await logoElement.waitForExist({ timeout: 5000 });
    expect(await logoElement.isExisting()).toBe(true);
  });

  it('should have login element in the header', async () => {
    await browser.url('https://pixabay.com/');

    const loginElement = await browser.$('.label--Ngqjq');
    await loginElement.waitForExist({ timeout: 5000 });
    expect(await loginElement.isExisting()).toBe(true);
  });

  it('should have login button element in the header', async () => {
    await browser.url('https://pixabay.com/');

    const loginButtonElement = await browser.$('.loginButton--uIEF2');
    await loginButtonElement.waitForExist({ timeout: 5000 });
    expect(await loginButtonElement.isExisting()).toBe(true);
  });

  it('should have upload button element in the header', async () => {
    await browser.url('https://pixabay.com/');

    const uploadButtonElement = await browser.$('.uploadButton--p9Oz2');
    await uploadButtonElement.waitForExist({ timeout: 5000 });
    expect(await uploadButtonElement.isExisting()).toBe(true);
  });
});
