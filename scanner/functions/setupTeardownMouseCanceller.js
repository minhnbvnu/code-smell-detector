function setupTeardownMouseCanceller(setup) {
    let events = IS_TOUCH_ONLY ? ['click'] : MOUSE_EVENTS;
    for (let i = 0, en; i < events.length; i++) {
      en = events[i];
      if (setup) {
        // reset clickLabels array
        clickedLabels.length = 0;
        document.addEventListener(en, mouseCanceller, true);
      } else {
        document.removeEventListener(en, mouseCanceller, true);
      }
    }
  }