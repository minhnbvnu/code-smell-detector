function handleMousedown(e) {
      e.touches = e.touches || [{
        screenX: e.screenX,
        screenY: e.screenY
      }];
      // Mouse needs this
      startY = Math.floor(e.touches[0].screenY);
    }