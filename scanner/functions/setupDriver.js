async function setupDriver(callback) {
  const runTests = (driver, browser) => {
    // eslint-disable-next-line compat/compat
    return new Promise(res => {
      callback(
        () => ({
          start: async () => {
            await driver.get('http://127.0.0.1:3000/test.html');
            await driver.wait(until.elementLocated(By.id('loaded')), 2000);
            return driver;
          }
        }),
        browser,
        res
      );
    });
  };

  const builder = new webdriver.Builder();

  if (process.env.BROWSERSTACK === 'true') {
    const bsLocal = await startBrowserStackLocal();
    const promises = [];

    capabilities.forEach(capability =>
      promises.push(
        new Promise((res, rej) => {
          // Note: this is just for displaying in the console as the tests are running.
          const browser = `${capability.browserName} ${capability.browserVersion} ${capability.platform}`;

          builder
            .withCapabilities({
              ...capability,
              ...commonCapabilities,
              'bstack:options': {
                ...capability['bstack:options'],
                ...commonCapabilities['bstack:options']
              }
            })
            .usingServer(server)
            .build()
            .then(driver => {
              runTests(driver, browser)
                .then(() => {
                  driver.quit();
                  res();
                })
                .catch(err => {
                  console.error(err);
                  driver.quit();
                  rej(err);
                });
            })
            .catch(e => {
              bsLocal.stop(() => console.log('BrowserStack local stopped'));
              throw e;
            });
        })
      )
    );

    try {
      await Promise.all(promises);
    } finally {
      console.log('Stopping');
      bsLocal.stop(() => console.log('BrowserStack local stopped'));
    }
  } else {
    let browserName = 'Chrome';
    builder.forBrowser('chrome');

    if (process.env.HEADLESS) {
      builder.setChromeOptions(new chrome.Options().headless());
      browserName = 'Chrome Headless';
    }

    let driver;
    try {
      driver = await builder.build();
      await runTests(driver, browserName);
      await driver.quit();
    } catch (e) {
      console.log(e);
    } finally {
      driver.quit();
    }
  }
}