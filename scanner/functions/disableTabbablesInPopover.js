function disableTabbablesInPopover() {
    var elements = popoverRef.current && tabbable_default()(popoverRef.current);

    if (elements) {
      elements.forEach(function (element) {
        restoreTabIndexTuplés.push([element, element.tabIndex]);
        element.tabIndex = -1;
      });
      ownerDocument.addEventListener("focusin", enableTabbablesInPopover);
    }
  }