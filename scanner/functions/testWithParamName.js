function testWithParamName(remote, baseUrl, paramName, files, expectedNumberOfPageTables, expectedNumberOfErrors) {
    // Some of these tests need a larger timeout for finding DOM elements
    // because we need the HAR to parse/display fully before we query the DOM.
    const r = remote;
    const utils = new DriverUtils(r);

    if (typeof expectedNumberOfPageTables !== "number") {
      // If no explicit "expectedNumberOfPageTables" provided, default to number of files.
      expectedNumberOfPageTables = files.length;
    }

    if (typeof expectedNumberOfErrors !== "number") {
      expectedNumberOfErrors = 0;
    }

    // Put together URL that specifies multiple HAR files.
    let url = harViewerBase + "?";
    if (baseUrl) {
      url += "baseUrl=" + baseUrl + "&";
    }

    // Append the file params to the URL.
    url += makeParamsString(paramName, files);

    // Example of the result URL:
    // http://legoas/har/viewer/?
    // baseUrl=http://legoas/har/viewer/selenium/tests/hars/&
    // path=1.har&path=2.har&path=3.har&path=4.har&path=5.har&
    // path=6.har&path=7.har&path=8.har&path=9.har

    const waitForFilesToLoadMs = findTimeout;
    const assertExpectedNumberOfPageTablesJS = [
      `return (`,
      `  document.querySelectorAll(".pageTable").length === ${expectedNumberOfPageTables}`,
      `) || null;`,
    ].join("");

    return r
      .setFindTimeout(findTimeout)
      .get(url)
      // Wait for 10 sec to load all HAR files.
      // Return null or undefined to indicate poll not successful (yet).
      // http://theintern.github.io/leadfoot/pollUntil.html
      .then(pollUntil(assertExpectedNumberOfPageTablesJS, waitForFilesToLoadMs))
      // ignore pollUntil timeout error because we repeat the .pageTable selector below
      .catch(() => 1)
      // We don't want to wait any longer for .pageTable or .errorTable elements to appear.
      // They should already be there after the above pollUntil has waited.
      .setFindTimeout(0)
      .findAllByCssSelector(".pageTable")
      .then((els) => assert.strictEqual(els.length, expectedNumberOfPageTables, ".pageTable"))
      .end(Infinity)
      .findAllByCssSelector(".errorTable")
      .then((els) => assert.strictEqual(els.length, expectedNumberOfErrors, ".errorTable"))
      .then(utils.cbAssertElementContainsText("css=.PreviewTab.selected", "Preview"));
  }