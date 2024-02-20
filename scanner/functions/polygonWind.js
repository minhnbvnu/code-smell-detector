function polygonWind(polygon, order = "ccw") {
  if (polygon.length < 3) return null;
  
  const reversed = polygon.slice().reverse();
  const isClockwise = polygonArea(polygon, true) > 0;
  
  if (order === "cw" || order === "clockwise") {
    return isClockwise ? polygon : reversed;
  }
  else {
    return isClockwise ? reversed : polygon;
  }
}