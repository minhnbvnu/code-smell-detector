function focusFirstPopoverTabbable(event) {
    var elements = popoverRef.current && tabbable_default()(popoverRef.current);

    if (elements && elements[0]) {
      event.preventDefault();
      elements[0].focus();
    }
  }