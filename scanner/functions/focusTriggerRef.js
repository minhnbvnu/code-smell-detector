function focusTriggerRef(event) {
    var _triggerRef$current;

    event.preventDefault();
    (_triggerRef$current = triggerRef.current) == null ? void 0 : _triggerRef$current.focus();
  }