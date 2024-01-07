function didMouseUp() {
      this.stopDragging = null;
      window.removeEventListener('mousemove', didMouseMove);
      window.removeEventListener('mouseup', didMouseUp, { capture: true });
      if (dragging) {
        dragging = false;
        didStopDragging();
      }
    }