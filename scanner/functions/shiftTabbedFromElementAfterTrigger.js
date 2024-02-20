function shiftTabbedFromElementAfterTrigger(event) {
    if (!event.shiftKey) return;
    var elementAfterTrigger = getElementAfterTrigger();
    return event.target === elementAfterTrigger;
  }