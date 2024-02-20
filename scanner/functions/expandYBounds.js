function expandYBounds(bounds, value) {
  if (bounds[MIN_Y] > value) bounds[MIN_Y] = value;else if (bounds[MAX_Y] < value) bounds[MAX_Y] = value;
}