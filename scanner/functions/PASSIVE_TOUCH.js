function PASSIVE_TOUCH(eventName) {
    if (isMouseEvent(eventName) || eventName === 'touchend') {
      return;
    }
    if (HAS_NATIVE_TA && SUPPORTS_PASSIVE && Polymer.passiveTouchGestures) {
      return {passive: true};
    } else {
      return;
    }
  }