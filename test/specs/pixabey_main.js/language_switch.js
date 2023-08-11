const { remote } = require('webdriverio');
describe('Language Change Test', () => {
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

  it('should verify language change on the website', async () => {
    await browser.url('https://pixabay.com');

    const exploreButton = await browser.$(
      '//button[@class="buttonBase--r4opq tertiaryButton--+4ehJ base--jzyee dark--jRuwC"]'
    );
    await exploreButton.click();

    const languageDropdown = await browser.$(
      '//div[@class="languageMenuLabel--nVEIW languageMenuTrigger--J1hBm"]//div[@class="dropdownMenuItem--yZ9j-"]'
    );
    await languageDropdown.click();

    const germanLanguageOption = await browser.$(
      '//a[@href="https://pixabay.com/de/"]'
    );
    await germanLanguageOption.click();
    await browser.waitUntil(
      async () => {
        const pageTextElement = await browser.$(
          '//h1[normalize-space()="Beeindruckende kostenlose & lizenzfreie Bilder"]'
        );
        const pageText = await pageTextElement.getText();
        return pageText === 'Beeindruckende kostenlose & lizenzfreie Bilder';
      },
      {
        timeout: 5000,
        timeoutMsg: 'Expected text did not appear after language change'
      }
    );
  });
});
