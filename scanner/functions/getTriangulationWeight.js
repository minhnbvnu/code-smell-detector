function getTriangulationWeight(a, b) {
    if (overlaps(a, b)) {
      const centerDistance = getPointDistance(a, b)
      const t = getOverlapFactor(a, b)
      return -(t - 1) * centerDistance
    }

    return getRectangularDistance(a, b)
  }