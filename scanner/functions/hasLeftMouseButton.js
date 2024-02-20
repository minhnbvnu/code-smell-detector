function hasLeftMouseButton(ev) {
    let type = ev.type;
    // exit early if the event is not a mouse event
    if (!isMouseEvent(type)) {
      return false;
    }
    // ev.button is not reliable for mousemove (0 is overloaded as both left button and no buttons)
    // instead we use ev.buttons (bitmask of buttons) or fall back to ev.which (deprecated, 0 for no buttons, 1 for left button)
    if (type === 'mousemove') {
      // allow undefined for testing events
      let buttons = ev.buttons === undefined ? 1 : ev.buttons;
      if ((ev instanceof window.MouseEvent) && !MOUSE_HAS_BUTTONS) {
        buttons = MOUSE_WHICH_TO_BUTTONS[ev.which] || 0;
      }
      // buttons is a bitmask, check that the left button bit is set (1)
      return Boolean(buttons & 1);
    } else {
      // allow undefined for testing events
      let button = ev.button === undefined ? 0 : ev.button;
      // ev.button is 0 in mousedown/mouseup/click for left button activation
      return button === 0;
    }
  }