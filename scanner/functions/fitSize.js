function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}