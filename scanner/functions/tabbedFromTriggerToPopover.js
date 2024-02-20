function tabbedFromTriggerToPopover() {
    return triggerRef.current ? triggerRef.current === ownerDocument.activeElement : false;
  }