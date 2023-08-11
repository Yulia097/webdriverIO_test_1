describe('selectors', () => {
  it('verify link text', async () => {
    await browser.url('https://pixabay.com/');
    const locator = await browser.$('//span[normalize-space()="nature"][1]');

    await locator.click();

    await browser.waitUntil(
      async () => {
        const link = await browser.$('a[href="/images/search/nature/"]');
        const hrefValue = await link.getAttribute('href');
        console.log('/images/search/nature/', hrefValue);
        return hrefValue === '/images/search/nature/';
      },
      {
        timeout: 5000,
        timeoutMsg: 'Error'
      }
    );
  });
});

it('verify url', async () => {
  await browser.url('https://pixabay.com/');
  const locator = await browser.$('//span[normalize-space()="nature"][1]');

  await locator.click();

  await browser.waitUntil(
    async () => {
      const currentUrl = await browser.getUrl();
      return currentUrl === 'https://pixabay.com/images/search/nature/';
    },
    {
      timeout: 5000,
      timeoutMsg: 'Timeout Error'
    }
  );
});
