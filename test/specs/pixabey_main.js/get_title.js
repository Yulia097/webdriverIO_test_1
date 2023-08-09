describe('Pixabay search', () => {
  it('Searches for Cat and verifies cat images', async () => {
    await browser.url('https://pixabay.com/');

    const searchInput = await browser.$(
      '//input[@placeholder="Search for all images on Pixabay"]'
    );
    const searchButton = await browser.$(
      '//span[normalize-space()="All images"]'
    );

    await searchInput.setValue('cat');

    await searchButton.click();

    const catImages = await browser.$$('img[src*="cat"]');
    expect(catImages.length).toBeGreaterThan(0);

    async () => {
      const title = await browser.getTitle();
      expect(title).toContain('cat');
    };
  });
});
