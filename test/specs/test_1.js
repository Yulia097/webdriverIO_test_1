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
    // 2. Закриття браузера після завершення тестування
    await browser.deleteSession();
  });

  describe('Logo click functionality', () => {
    it('should navigate to the home page after clicking the logo', async () => {
      // 3. Відкриття веб-сторінки
      await browser.url('https://www.we-pdf.com/');

      // 4. Клік на логотип
      const logoElement = await browser.$('css-lb9fd6');
      await logoElement.click();

      // 5. Очікування переходу на домашню сторінку
      await browser.waitUntil(
        async () => {
          const currentUrl = await browser.getUrl();
          return currentUrl === 'https://www.we-pdf.com/';
        },
        {
          timeout: 5000
        }
      );

      // 6. Перевірка URL після кліку на логотип
      const currentUrl = await browser.getUrl();
      assert.strictEqual(
        currentUrl,
        'https://www.we-pdf.com/',
        'Перехід на домашню сторінку НЕ відбувся'
      );
    });
  });
});
