function getRidge (direction, center, polygon) {
    const rad = ((direction-90) / 180 - 0.5) * Math.PI;
    return getRidgeIntersections(center, [Math.cos(rad), Math.sin(rad)], polygon);
  }