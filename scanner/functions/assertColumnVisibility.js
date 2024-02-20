function assertColumnVisibility(visible, locator) {
    var script = "return document.querySelector('" + locator + "').clientWidth";
    return function() {
      return this.session.execute(script).then(function(clientWidth) {
        var result = visible ? (clientWidth > 0) : (clientWidth === 0);
        assert.ok(result, "Column " + locator + " is wrong, as clientWidth=" + clientWidth + " and visible=" + visible);
      });
    };
  }