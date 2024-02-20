function noConflict() {
      if (root._ === this) {
        root._ = oldDash;
      }
      return this;
    }