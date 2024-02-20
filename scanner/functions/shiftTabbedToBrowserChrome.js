function shiftTabbedToBrowserChrome(event) {
    // we're assuming the popover will never contain the first tabbable
    // element, and it better not, because the trigger needs to be tabbable!
    return event.target === tabbable_default()(ownerDocument)[0];
  }