function longitude(point) {
  return abs(point[0]) <= pi ? point[0] : sign(point[0]) * ((abs(point[0]) + pi) % tau - pi);
}