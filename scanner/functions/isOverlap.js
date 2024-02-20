function isOverlap(a, b) {
    return getOffset(a, b) <= (a.width + b.width) / 2;
  }