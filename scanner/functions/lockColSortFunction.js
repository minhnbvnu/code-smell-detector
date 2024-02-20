function lockColSortFunction(x, y) {
  if (x.lockCol != y.lockCol) {
    return gSortDirection * (y.lockCol - x.lockCol);
  }
  return prefColSortFunction(x, y);
}