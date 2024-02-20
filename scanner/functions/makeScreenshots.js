async function makeScreenshots(helpers, { screenshotCacheDir }) {
  console.log('Taking screenshots...');
  const browser = await chrome.puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: true,
  });
  const limit = pLimit(8);
  const screenshotPromises = helpers.map((helper) =>
    limit(() => screenshotHelper(browser, helper, screenshotCacheDir))
  );
  await Promise.all(screenshotPromises);
  await browser.close();
}