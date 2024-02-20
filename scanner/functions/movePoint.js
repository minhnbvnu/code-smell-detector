function movePoint(point, angle, distance) {
  return {
    x: point.x + Math.cos(angle) * distance,
    y: point.y + Math.sin(angle) * distance
  };
}