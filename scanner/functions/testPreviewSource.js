function testPreviewSource(remote, json) {
    // Some of these tests need a larger timeout for finding DOM elements
    // because we need the HAR to parse/display fully before we query the DOM.
    var findTimeout = config.findTimeout;
    var r = remote;
    var utils = new DriverUtils(r);

    return r
      .setFindTimeout(findTimeout)
      .get(harViewerBase)
      // Wait for the #sourceEditor element
      .findById("sourceEditor")
      // End the element context
      .end()
      .execute("document.getElementById('sourceEditor').value = '" + json + "'")
      // Click on the example link
      .findById("appendPreview")
      .click()
      // The Preview tab must be selected and example HAR file loaded.
      .then(utils.cbAssertElementContainsText("css=.PreviewTab.selected", "Preview"))
  }