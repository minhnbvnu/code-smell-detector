async function takeScreenshot(url) {

  // write the screenshot to this file
  const filename = Date.now() + '.png'

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
    defaultViewport: {
      width: 1024,
      height: 768,
    }
  })

  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'networkidle0'})

  // get the diff portion of the page
  const box = await page.evaluate(() => {
    const element = document.querySelector('table.diff.diff-contentalign-left')
    // need to unpack values because DOMRect object isn't returnable
    const {x, y, width, height} = element.getBoundingClientRect()
    return {x, y, width, height}
  })

  // resize viewport in case the diff element isn't fully visible
  await page.setViewport({
    width: 1024,
    height: parseInt(box.y + box.height + 20)
  })

  // take the screenshot!
  await page.screenshot({
    path: filename,
    clip: box
  })

  await browser.close()
  return filename
}