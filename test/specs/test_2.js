const assert = require('assert');
const { remote } = require('webdriverio');

describe('Header Test', () => {
  let browser;

  before(async () => {
    // 1.Ініціалізація браузера
    browser = await remote({
      capabilities: {
        browserName: 'chrome'
      }
    });
  });

  it('should open the correct page', async () => {
    // 2. Відкриваємо веб-сторінку
    await browser.url('https://www.we-pdf.com/');

    // Перевіряємо, що заголовок містить очікуваємий тест
    const title = await browser.getTitle();
    assert.strictEqual(
      title,
      'Modify, convert and manage PDF documents online'
    );
  });
  //
});
