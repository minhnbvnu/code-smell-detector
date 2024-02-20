function clickNetLabel(idx) {
    return function() {
      // Find all .netFullHrefLabel rows
      var context;
      return this.parent
        .findAllByCssSelector(".netFullHrefLabel.netHrefLabel.netLabel")
        .then(function(els, setContext) {
          context = els[idx];
          setContext(context);
        })
        // NOTE - gitgrimbo
        // The element selected above, one of (".netFullHrefLabel.netHrefLabel.netLabel")
        // is hidden, so click does not work. Therefore, click the parent.
        .findByXpath("..")
        .click()
        // Ensure we leave this function with the found element as the context.
        .then(function(_, setContext) {
          setContext(context);
        })
    };
  }