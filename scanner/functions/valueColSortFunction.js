function valueColSortFunction(x, y) {
  if (x.valueCol > y.valueCol) {
    return gSortDirection;
  }
  if (x.valueCol < y.valueCol) {
    return -gSortDirection;
  }
  return prefColSortFunction(x, y);
}