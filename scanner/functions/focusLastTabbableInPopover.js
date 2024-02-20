function focusLastTabbableInPopover(event) {
    var elements = popoverRef.current && tabbable_default()(popoverRef.current);
    var last = elements && elements[elements.length - 1];

    if (last) {
      event.preventDefault();
      last.focus();
    }
  }