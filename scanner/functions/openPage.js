async function openPage(url, extraHTTPHeaders) {
    const page = await browser.newPage();
    try {
      let deviceSet = devices[device];
      page.setUserAgent(deviceSet[2]);
      page.setViewport({width: deviceSet[0], height: deviceSet[1]});

      if(extraHTTPHeaders && getAgrType(extraHTTPHeaders) === 'object') {
        await page.setExtraHTTPHeaders(new Map(Object.entries(extraHTTPHeaders)));
      }
      await page.goto(url, {
        timeout: 2 * 60 * 1000,
        waitUntil: 'networkidle0'
      });
    } catch (e) {
      console.log('\n');
      log.error(e.message);
    }
    return page;
  }