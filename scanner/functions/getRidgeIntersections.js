function getRidgeIntersections (center, direction, polygon) {
    // create polygon intersections
    var index = [], point;
    for (var i = 0; i<polygon.length - 1; i++) {
      point = getVectorSegmentIntersection(center, direction, [polygon[i], polygon[i+1] ]);
      if (point !== undefined) {
        if (index.length === 2) {
          // more than 2 intersections: too complex for gabled roof, should be hipped+skeleton anyway
          return;
        }
        i++;
        polygon.splice(i, 0, point);
        index.push(i);
      }
    }

    // requires at least 2 intersections
    if (index.length < 2) {
      return;
    }

    return { index: index, roof: polygon };
  }