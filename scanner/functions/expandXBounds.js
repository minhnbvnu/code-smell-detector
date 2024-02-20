function expandXBounds(bounds, value) {
  if (bounds[MIN_X] > value) bounds[MIN_X] = value;else if (bounds[MAX_X] < value) bounds[MAX_X] = value;
}