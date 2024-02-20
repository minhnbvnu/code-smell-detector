async function minimizePage (page) {
  const session = await page.target().createCDPSession()
  const goods = await session.send('Browser.getWindowForTarget')
  const { windowId } = goods
  await session.send('Browser.setWindowBounds', {
    windowId,
    bounds: { windowState: 'minimized' }
  })
}