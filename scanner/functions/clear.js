function clear() {
    // clear out any elements that are queued to be set to active
    queueElements = {};

    // in the next frame, remove the active class from all active elements
    ionic.requestAnimationFrame(deactivateElements);
  }