function typeColSortFunction(x, y) {
  if (x.typeCol != y.typeCol) {
    return gSortDirection * (y.typeCol - x.typeCol);
  }
  return prefColSortFunction(x, y);
}