const { remote } = require('webdriverio');

describe('Photo Like Test', () => {
  let browser;
  let initialLikesCount;

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

  it('should log in and like a photo with specified username and password', async () => {
    await browser.url('https://pixabay.com');

    const loginButton = await browser.$('//span[normalize-space()="Log in"]');
    await loginButton.click();

    await browser.waitUntil(
      async () => {
        const usernameInput = await browser.$('//input[@name="login_user"]');
        const passwordInput = await browser.$('//input[@name="login_pass"]');
        await usernameInput.setValue('testforqaq');
        await passwordInput.setValue('test12345');
        return true;
      },
      {
        timeout: 10000,
        timeoutMsg: 'Timeout while entering username and password'
      }
    );

    const submitButton = await browser.$(
      '//button[@class="loginButton--cVPDu e2e-auth-login-submit-button base--o-Oap primary--uRlHk"]'
    );
    await submitButton.click();

    await browser.waitUntil(
      async () => {
        const doesExist = await browser
          .$(
            'button[class="loginButton--uIEF2 buttonBase--r4opq tertiaryButton--+4ehJ base--jzyee dark--jRuwC"] span[class="label--Ngqjq"]'
          )
          .isExisting();
        return doesExist;
      },
      {
        timeout: 60000,
        timeoutMsg: 'Timeout waiting for user to log in'
      }
    );

    console.log('User logged in successfully');

    // Navigate to the photo page and perform the like action
    await browser.url('https://pixabay.com');
    const photoLocator = await browser.$(
      'img[title="Download free HD stock image of Bird Falcon"]'
    );
    await photoLocator.click();

    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return (
          currentUrl ===
          'https://pixabay.com/photos/solar-wind-borealis-northern-lights-7917659/'
        );
      },
      {
        timeout: 10000,
        timeoutMsg: 'Timeout Error'
      }
    );

    const likeButton = await browser.$(
      '//span[@class="icon--L+lBh heart-outline--mC63s icon--hXcZl"]'
    );
    await likeButton.click();

    initialLikesCount = parseInt(
      await browser
        .$('//span[@class="icon--L+lBh heart-outline--mC63s icon--hXcZl"]')
        .getText(),
      10
    );

    await browser.waitUntil(
      async () => {
        const updatedLikesCountElement = await browser.$(
          '//button[@class="squareIconAndTextButton--LErXp light--uBcBI base--jzyee light--uBcBI active--nIoT4"]'
        );
        const updatedLikesCount = parseInt(
          await updatedLikesCountElement.getText(),
          10
        );
        return updatedLikesCount > initialLikesCount;
      },
      {
        timeout: 80000,
        timeoutMsg: 'Like action did not complete within 80 seconds'
      }
    );

    const likedElement = await browser.$(
      '//span[@class="icon--L+lBh heart--8Abpk icon--hXcZl"]'
    );
    expect(likedElement).toBeExisting();
    expect(parseInt(await likedElement.getText())).toBe(initialLikesCount + 1);
  });
});

//00ab6b - color of the btn
// - стан кнопки
// switch between pages
// share photo with facebook
