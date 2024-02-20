function pointInPolygon(point, polygon) {
  let x = point[0],
      y = point[1],
      inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1],
          xj = polygon[j][0], yj = polygon[j][1];
  
    if (((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) { inside = !inside; }
  }
  
  return inside;
}