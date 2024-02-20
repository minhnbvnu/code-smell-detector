function useSimulateTabNavigationForReactTree(triggerRef, popoverRef) {
  var ownerDocument = getOwnerDocument(triggerRef.current);

  function handleKeyDown(event) {
    if (event.key === "Tab" && popoverRef.current && tabbable_default()(popoverRef.current).length === 0) {
      return;
    }

    if (event.key === "Tab" && event.shiftKey) {
      if (shiftTabbedFromElementAfterTrigger(event)) {
        focusLastTabbableInPopover(event);
      } else if (shiftTabbedOutOfPopover(event)) {
        focusTriggerRef(event);
      } else if (shiftTabbedToBrowserChrome(event)) {
        disableTabbablesInPopover();
      }
    } else if (event.key === "Tab") {
      if (tabbedFromTriggerToPopover()) {
        focusFirstPopoverTabbable(event);
      } else if (tabbedOutOfPopover()) {
        focusTabbableAfterTrigger(event);
      } else if (tabbedToBrowserChrome(event)) {
        disableTabbablesInPopover();
      }
    }
  }

  Object(react["useEffect"])(function () {
    ownerDocument.addEventListener("keydown", handleKeyDown);
    return function () {
      ownerDocument.removeEventListener("keydown", handleKeyDown);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getElementAfterTrigger() {
    var elements = tabbable_default()(ownerDocument);
    var targetIndex = elements && triggerRef.current ? elements.indexOf(triggerRef.current) : -1;
    var elementAfterTrigger = elements && elements[targetIndex + 1];
    return popoverRef.current && popoverRef.current.contains(elementAfterTrigger || null) ? false : elementAfterTrigger;
  }

  function tabbedFromTriggerToPopover() {
    return triggerRef.current ? triggerRef.current === ownerDocument.activeElement : false;
  }

  function focusFirstPopoverTabbable(event) {
    var elements = popoverRef.current && tabbable_default()(popoverRef.current);

    if (elements && elements[0]) {
      event.preventDefault();
      elements[0].focus();
    }
  }

  function tabbedOutOfPopover() {
    var inPopover = popoverRef.current ? popoverRef.current.contains(ownerDocument.activeElement || null) : false;

    if (inPopover) {
      var elements = popoverRef.current && tabbable_default()(popoverRef.current);
      return Boolean(elements && elements[elements.length - 1] === ownerDocument.activeElement);
    }

    return false;
  }

  function focusTabbableAfterTrigger(event) {
    var elementAfterTrigger = getElementAfterTrigger();

    if (elementAfterTrigger) {
      event.preventDefault();
      elementAfterTrigger.focus();
    }
  }

  function shiftTabbedFromElementAfterTrigger(event) {
    if (!event.shiftKey) return;
    var elementAfterTrigger = getElementAfterTrigger();
    return event.target === elementAfterTrigger;
  }

  function focusLastTabbableInPopover(event) {
    var elements = popoverRef.current && tabbable_default()(popoverRef.current);
    var last = elements && elements[elements.length - 1];

    if (last) {
      event.preventDefault();
      last.focus();
    }
  }

  function shiftTabbedOutOfPopover(event) {
    var elements = popoverRef.current && tabbable_default()(popoverRef.current);

    if (elements) {
      return elements.length === 0 ? false : event.target === elements[0];
    }

    return false;
  }

  function focusTriggerRef(event) {
    var _triggerRef$current;

    event.preventDefault();
    (_triggerRef$current = triggerRef.current) == null ? void 0 : _triggerRef$current.focus();
  }

  function tabbedToBrowserChrome(event) {
    var elements = popoverRef.current ? tabbable_default()(ownerDocument).filter(function (element) {
      return !popoverRef.current.contains(element);
    }) : null;
    return elements ? event.target === elements[elements.length - 1] : false;
  }

  function shiftTabbedToBrowserChrome(event) {
    // we're assuming the popover will never contain the first tabbable
    // element, and it better not, because the trigger needs to be tabbable!
    return event.target === tabbable_default()(ownerDocument)[0];
  }

  var restoreTabIndexTuplés = [];

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

  function enableTabbablesInPopover() {
    ownerDocument.removeEventListener("focusin", enableTabbablesInPopover);
    restoreTabIndexTuplés.forEach(function (_ref2) {
      var element = _ref2[0],
          tabIndex = _ref2[1];
      element.tabIndex = tabIndex;
    });
  }
}