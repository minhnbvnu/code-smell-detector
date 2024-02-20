function flattenPolygon(coordinates, data, indices, areas, options) {
    let count = 0;
    const ringAreas = [];
    const polygons = [];
    for (const lineString of coordinates) {
      const lineString2d = lineString.map((p) => p.slice(0, 2));
      let area2 = getPolygonSignedArea(lineString2d.flat());
      const ccw = area2 < 0;
      if (options.fixRingWinding && (count === 0 && !ccw || count > 0 && ccw)) {
        lineString.reverse();
        area2 = -area2;
      }
      ringAreas.push(area2);
      flattenLineString(lineString, data, polygons, options);
      count++;
    }
    if (count > 0) {
      areas.push(ringAreas);
      indices.push(polygons);
    }
  }