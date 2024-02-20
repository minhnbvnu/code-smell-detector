function assertTestIsOk(expectedNetRows) {
    return function() {
      let iframe;
      return this.parent
        .findByCssSelector("iframe")
        .then((_) => {
          iframe = _;
          return iframe.getAttribute("src");
        })
        // search for the action parameter and value.
        // "%3D" === encodeURIComponent("=")
        .then((src) => assert.include(src, "action%3Dshow_me_har_file"))
        .then(() => this.parent.switchToFrame(iframe))
        .end(Infinity)
        .findAllByCssSelector(".pageTable")
        .then((pageTables) => assert.strictEqual(pageTables.length, 1, ".pageTable"))
        .findAllByCssSelector(".netRow")
        .then((netRows) => assert.strictEqual(netRows.length, expectedNetRows, ".netRow"));
    };
  }