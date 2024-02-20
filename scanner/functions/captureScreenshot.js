async function captureScreenshot({fullsize = false, force = false} = {}) {
  const [
    {id: tabId, url, height: defaultHeight, width},
  ] = await browser.tabs.query({
    currentWindow: true,
    active: true,
  })

  browser.debugger.attach({tabId}, PROTOCOL_VERSION, async () => {
    try {
      let height = defaultHeight
      if (fullsize) {
        height = force ? MAX_HEIGHT : await getBodyScrollHeight()
      }
      /**
       * When debugger send command, browser will display a notice.
       * That will collapse window.innerHeight.
       * So the screenshot's height is smaller than viewport.
       * take this step can make a fix.
       */
      await sendCommand(
        tabId,
        'Emulation.setDeviceMetricsOverride',
        {
          height,
          width,
          mobile: false,
          deviceScaleFactor: 0,
        },
        /**
         * Wait until view size changed
         */
        200
      )

      /**
       * Get screenshot png base64 data
       */
      const {data} = await sendCommand(tabId, 'Page.captureScreenshot')
      const filename = `${new URL(url).hostname}.png`
      const base64 = `data:image/png;base64,${data}`
      executeScript(downloadBase64File, [filename, base64])
    } finally {
      browser.debugger.detach({tabId})
    }
  })
}