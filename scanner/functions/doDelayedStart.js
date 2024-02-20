function doDelayedStart() {
    window.setTimeout(function() {
      s.start(true);
    }, 20);
    // event cleanup
    s.events.remove(isIE?document:window,'mousemove',doDelayedStart);
  }