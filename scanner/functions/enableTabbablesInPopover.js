function enableTabbablesInPopover() {
    ownerDocument.removeEventListener("focusin", enableTabbablesInPopover);
    restoreTabIndexTuplés.forEach(function (_ref2) {
      var element = _ref2[0],
          tabIndex = _ref2[1];
      element.tabIndex = tabIndex;
    });
  }