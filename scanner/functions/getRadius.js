function getRadius(x2, x, y2, y) {
  // More fun geometry from high school

  var distance = Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
  var radius = ((distance / width) * 100).toFixed(1);

  return radius;
}