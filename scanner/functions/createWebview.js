function createWebview(context, pickerButton, setColor) {

  const webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, 220, 300));
  const windowObject = webView.windowScriptObject();
  const delegate = new MochaJSDelegate({
    "webView:didFinishLoadForFrame:": (function (webView, webFrame) {
      logger.log('loaded')
    }),
    "webView:didChangeLocationWithinPageForFrame:": (function (webView, webFrame) {
      const query = windowObject.evaluateWebScript('window.location.hash')
      const color = JSON.parse(decodeURIComponent(query).split('color=')[1])
      color.r = parseInt(color.r) / 255
      color.g = parseInt(color.g) / 255
      color.b = parseInt(color.b) / 255
      color.a = parseFloat(color.a)

      const colorNS = NSColor.colorWithRed_green_blue_alpha(color.r, color.g, color.b, color.a)
      const colorMS = MSImmutableColor.colorWithNSColor(colorNS)

      pickerButton.setImage(getImageByColor(colorNS, { width: 40, height: 30 }))
      setColor(colorMS)
    })
  })

  webView.setDrawsBackground(false)
  webView.setMainFrameURL_(context.plugin.urlForResourceNamed("webview.html").path());
  webView.setFrameLoadDelegate_(delegate.getClassInstance());
  return webView
}