const { remote } = require('webdriverio');
const axios = require('axios');
const fs = require('fs');
const { remote } = require('webdriverio');

const browser = await remote({
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/Users/ruslanmoiseyenko/Desktop/chromedriver' // Замените путь на фактический путь к ChromeDriver
    }
  }
});

describe('Image Download Test', () => {
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

  it('should download and verify image', async () => {
    await browser.url('https://pixabay.com/');

    const imageUrl =
      'https://cdn.pixabay.com/photo/2023/08/02/14/56/animal-8165466_640.jpg';

    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    fs.writeFileSync('downloaded_image.jpg', response.data);
    console.log(response.data);
  });
});

if (fs.existsSync('downloaded_image.jpg')) {
  console.log('Image was successfully downloaded and saved.');
} else {
  throw new Error('Image file was not saved.');
}

// const stats = fs.statSync('downloaded_image.jpg');
// const fileSizeInBytes = stats.size;

// const expectedFileSize = 20;

// if (fileSizeInBytes === expectedFileSize) {
//   console.log('Image file size matches expected.');
// } else {
//   throw new Error('Image file size does not match expected size.');
// }
