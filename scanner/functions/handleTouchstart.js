function handleTouchstart(e) {
      e.touches = e.touches || [{
        screenX: e.screenX,
        screenY: e.screenY
      }];

      startY = e.touches[0].screenY;
    }