function clickTab(tabName) {
    return function() {
      return this.parent
        .findByCssSelector(".netInfoRow ." + tabName + "Tab.tab")
        .click();
    };
  }