function testViewerLoadsThreeHars(remote, page) {
    // Some of these tests need a larger timeout for finding DOM elements
    // because we need the HAR to parse/display fully before we query the DOM.
    var findTimeout = config.findTimeout;
    var utils = new DriverUtils(remote);

    var url = testBase + page;

    return remote
      .setFindTimeout(findTimeout)
      // Open customized viewer.
      .get(url)
      // Wait for 10 sec to load HAR files.
      .then(pollUntil("return (document.querySelectorAll('.pageTable').length == 3) || null", findTimeout))
      .then(utils.cbAssertElementContainsText("css=.PreviewTab.selected", "Preview"))
      .then(utils.cbAssertElementsLength(".pageTable", 3));
  }