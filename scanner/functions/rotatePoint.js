function rotatePoint(point, angle) {
  let sin = Math.sin(angle);
  let cos = Math.cos(angle);

  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos
  };
}