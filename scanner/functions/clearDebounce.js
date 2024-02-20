function clearDebounce() {
        if (debounce) {
          cancelAnimationFrame(debounce);
          debounce = 0;
        }
      }