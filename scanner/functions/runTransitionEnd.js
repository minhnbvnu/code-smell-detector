function runTransitionEnd(pos, index) {
      if (options.transitionEnd) {
        options.transitionEnd(pos, index);
      }
    }