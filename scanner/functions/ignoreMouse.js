function ignoreMouse(e) {
    if (!POINTERSTATE.mouse.mouseIgnoreJob) {
      setupTeardownMouseCanceller(true);
    }
    let unset = function() {
      setupTeardownMouseCanceller();
      POINTERSTATE.mouse.target = null;
      POINTERSTATE.mouse.mouseIgnoreJob = null;
    };
    POINTERSTATE.mouse.target = e.composedPath()[0];
    POINTERSTATE.mouse.mouseIgnoreJob = Polymer.Debouncer.debounce(
          POINTERSTATE.mouse.mouseIgnoreJob
        , Polymer.Async.timeOut.after(MOUSE_TIMEOUT)
        , unset);
  }