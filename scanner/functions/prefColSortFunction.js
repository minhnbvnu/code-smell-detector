function prefColSortFunction(x, y) {
  if (x.prefCol > y.prefCol) {
    return gSortDirection;
  }
  if (x.prefCol < y.prefCol) {
    return -gSortDirection;
  }
  return 0;
}