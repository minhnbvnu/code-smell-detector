function assertPreviewIsOk(id, expectedNetRows, expectedWidth, expectedHeight) {
    return function() {
      return this.parent
        .findByCssSelector(`#${id} iframe`)
        .then(function(iframe) {
          return getSize(this.parent, iframe)
            .then((size) => assertWidthHeight(`#${id} iframe`, size, expectedWidth, expectedHeight))
            .then(() => this.parent.switchToFrame(iframe))
            .end(Infinity)
            .findByCssSelector(".pageTable")
            .findAllByCssSelector(".netRow")
            .then((netRows) => assert.strictEqual(netRows.length, expectedNetRows, `#${id}.netRow`));
        })
        .switchToFrame(null);
    };
  }