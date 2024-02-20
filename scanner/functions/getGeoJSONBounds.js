function getGeoJSONBounds (geometry) {
  const
    type = geometry.type,
    coords = geometry.coordinates,
    min = [Infinity, Infinity],
    max = [-Infinity, -Infinity];

  if (type === 'Polygon' && coords.length) {
    coords[0].forEach(point => {
      if (point[0] < min[0]) min[0] = point[0];
      if (point[1] < min[1]) min[1] = point[1];
      if (point[0] > max[0]) max[0] = point[0];
      if (point[1] > max[1]) max[1] = point[1];
    });
    return {min, max};
  }

  if (type === 'MultiPolygon') {
    coords.forEach(polygon => {
      if (polygon[0]) {
        polygon[0].forEach(point => {
          if (point[0] < min[0]) min[0] = point[0];
          if (point[1] < min[1]) min[1] = point[1];
          if (point[0] > max[0]) max[0] = point[0];
          if (point[1] > max[1]) max[1] = point[1];
        });
      }
    });
    return {min, max};
  }
}