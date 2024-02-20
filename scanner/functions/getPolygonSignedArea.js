function getPolygonSignedArea(points, options = {}) {
    const {
      start = 0,
      end = points.length
    } = options;
    const dim = options.size || 2;
    let area2 = 0;
    for (let i = start, j = end - dim; i < end; i += dim) {
      area2 += (points[i] - points[j]) * (points[i + 1] + points[j + 1]);
      j = i;
    }
    return area2 / 2;
  }