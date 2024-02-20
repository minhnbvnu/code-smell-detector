async function screenshotHelper(browser, helper, screenshotDir) {
  try {
    const doubleSize = join(screenshotDir, `${toSlug(helper.name)}@2.jpg`);
    const singleSize = join(screenshotDir, `${toSlug(helper.name)}@1.jpg`);
    let sigil = '✅';
    if (!(await exists(doubleSize))) {
      const page = await browser.newPage();
      page.setViewport({
        width: 1000,
        height: 600,
      });
      await page.goto(helper.url, { waitUntil: 'networkidle0' });

      await page.screenshot({ path: doubleSize });
      await page.close();
      sigil = '📸';
    }
    if (!exists(singleSize)) {
      await (await Jimp.read(doubleSize))
        .quality(75)
        .resize(500, Jimp.AUTO)
        .write(singleSize);
    }
    console.log(`${sigil} ${helper.name} at ${helper.url}`);
  } catch (error) {
    console.error(`Failed to screenshot ${helper.name}`);
    throw error;
  }
}