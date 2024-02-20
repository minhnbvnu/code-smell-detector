function tabbedOutOfPopover() {
    var inPopover = popoverRef.current ? popoverRef.current.contains(ownerDocument.activeElement || null) : false;

    if (inPopover) {
      var elements = popoverRef.current && tabbable_default()(popoverRef.current);
      return Boolean(elements && elements[elements.length - 1] === ownerDocument.activeElement);
    }

    return false;
  }