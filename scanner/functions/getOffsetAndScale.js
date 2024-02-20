function getOffsetAndScale (polygons) {
  let
    minX = Infinity, maxX = -Infinity,
    minY = Infinity, maxY = -Infinity;

  polygons.forEach(poly => {
    poly.forEach(ring => {
      ring.forEach(point => {
        minX = Math.min(minX, point[0]);
        maxX = Math.max(maxX, point[0]);
        minY = Math.min(minY, point[1]);
        maxY = Math.max(maxY, point[1]);
      });
    });
  });

  return { offset: [minX, minY], scale: Math.max(maxX-minX, maxY-minY) };
}