function getVisibleTextForAll(els) {
    return Promise.all(els.map(function(el, i) {
      return el.getVisibleText();
    }));
  }