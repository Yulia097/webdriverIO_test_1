describe('Demo test', function () {
  it('My first test', async () => {
    browser.url('https://google.com');

    await browser.waitUntil(() => browser.getTitle() === 'Google', {
      timeout: 5000
    });
    await $('[name = "q"]').waitForDisplayed({ timeout: 5000 });
    await $('[name = "q"]').setValue('WebdriverIO');

    browser.pause(10000);

    await $('div#search').waitForExist({ timeout: 5000 });
  });
});

//todo:
// 1. Choose website for testing (WePdf)
// 2. Create test cases
// 3. Start writing test
// 4. Add base url
// 5. Start writing tests in specs
// 6. Create Github account + repository
//
