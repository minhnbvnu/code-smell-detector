function shiftTabbedOutOfPopover(event) {
    var elements = popoverRef.current && tabbable_default()(popoverRef.current);

    if (elements) {
      return elements.length === 0 ? false : event.target === elements[0];
    }

    return false;
  }