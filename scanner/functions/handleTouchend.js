function handleTouchend() {
      // reset Y
      startY = null;
      // if this wasn't an overscroll, get out immediately
      if (!canOverscroll && !isDragging) {
        return;
      }
      // the user has overscrolled but went back to native scrolling
      if (!isDragging) {
        dragOffset = 0;
        isOverscrolling = false;
        setScrollLock(false);
      } else {
        isDragging = false;
        dragOffset = 0;

        // the user has scroll far enough to trigger a refresh
        if (lastOverscroll > ptrThreshold) {
          start();
          scrollTo(ptrThreshold, scrollTime);

        // the user has overscrolled but not far enough to trigger a refresh
        } else {
          scrollTo(0, scrollTime, deactivate);
          isOverscrolling = false;
        }
      }
    }