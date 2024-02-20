function getEventTouches(e) {
      return e.touches && e.touches.length ? e.touches : [{
        pageX: e.pageX,
        pageY: e.pageY
      }];
    }