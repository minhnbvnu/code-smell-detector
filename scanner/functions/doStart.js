function doStart() {
    if (!s.excludeMobile || !isMobile) {
      if (s.freezeOnBlur) {
        s.events.add(isIE?document:window,'mousemove',doDelayedStart);
      } else {
        doDelayedStart();
      }
    }
    // event cleanup
    s.events.remove(window, 'load', doStart);
  }