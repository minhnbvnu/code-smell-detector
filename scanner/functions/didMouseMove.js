function didMouseMove(event) {
      lastMousemoveEvent = event;
      if (!dragging) {
        dragging = true;
        animationFrameLoop();
      }
    }