function overlaps(a, b) {
    if (pullX) {
      return true;
    }
    // If one rectangle is on left side of other
    // NOTE: This gives funny results when we always return true
    if (a.left > b.right || b.left > a.right) return pullX

    // If one rectangle is above other
    if (a.top > b.bottom || b.top > a.bottom) return pullY

    return true
  }