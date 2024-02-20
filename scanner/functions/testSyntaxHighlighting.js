function testSyntaxHighlighting(remote, url, expectedPageTitle) {
    return appDriver.openAndClickFirstNetLabel(remote, url, findTimeout, expectedPageTitle)
      .then(appDriver.clickTab("Highlighted"))
      // We assume that finding the following attribute flag means syntax highlighting has worked.
      // We use a generic flag and not an impl-specific class,
      // so we can swap out the highlighter library if necessary.
      // @See HighlightedTab in webapp/scripts/preview/requestBody.js
      .findByCssSelector("[highlighted=true]");
  }