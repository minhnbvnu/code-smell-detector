function focusTabbableAfterTrigger(event) {
    var elementAfterTrigger = getElementAfterTrigger();

    if (elementAfterTrigger) {
      event.preventDefault();
      elementAfterTrigger.focus();
    }
  }