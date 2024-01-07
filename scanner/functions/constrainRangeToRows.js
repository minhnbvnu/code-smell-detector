function constrainRangeToRows(range, startRow, endRow) {
  if (range.start.row < startRow || range.end.row >= endRow) {
    range = range.copy();
    if (range.start.row < startRow) {
      range.start.row = startRow;
      range.start.column = 0;
    }
    if (range.end.row >= endRow) {
      range.end.row = endRow;
      range.end.column = 0;
    }
  }
  return range;
}