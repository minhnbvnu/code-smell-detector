async function getScreenshot(url, ratio = 1) {
  const page = await getPage();
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  });
  await page.setViewport({
    width: 1000,
    height: 600,
    devicePixelRatio: ratio,
  });
  const file = await page.screenshot();
  return file;
}