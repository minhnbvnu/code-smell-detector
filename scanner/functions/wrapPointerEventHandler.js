function wrapPointerEventHandler(handler) {
    return function onPointerEvent(event) {
      // Handle pointer events only from mouse device
      if (event.pointerType !== "mouse") {
        return;
      }

      handler(event);
    };
  }