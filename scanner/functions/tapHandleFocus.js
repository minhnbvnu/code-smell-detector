function tapHandleFocus(ele) {
  tapTouchFocusedInput = null;

  var triggerFocusIn = false;

  if (ele.tagName == 'SELECT') {
    // trick to force Android options to show up
    triggerMouseEvent('mousedown', ele, 0, 0);
    ele.focus && ele.focus();
    triggerFocusIn = true;

  } else if (tapActiveElement() === ele) {
    // already is the active element and has focus
    triggerFocusIn = true;

  } else if ((/^(input|textarea|ion-label)$/i).test(ele.tagName) || ele.isContentEditable) {
    triggerFocusIn = true;
    ele.focus && ele.focus();
    ele.value = ele.value;
    if (tapEnabledTouchEvents) {
      tapTouchFocusedInput = ele;
    }

  } else {
    tapFocusOutActive();
  }

  if (triggerFocusIn) {
    tapActiveElement(ele);
    ionic.trigger('ionic.focusin', {
      target: ele
    }, true);
  }
}