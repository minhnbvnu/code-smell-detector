function testExample(remote, exampleId, expected) {
    // Some of these tests need a larger timeout for finding DOM elements
    // because we need the HAR to parse/display fully before we query the DOM.
    var findTimeout = config.findTimeout;
    var utils = new DriverUtils(remote);
    return remote
      .setFindTimeout(findTimeout)
      .get(harViewerBase)
      .find("id", exampleId)
      .click()
      .then(utils.cbAssertElementContainsText("css=.PreviewTab.selected", "Preview"))
      .then(utils.cbAssertElementContainsText("css=.previewList", expected));
  }