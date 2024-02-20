function _getCellRange (matrix, startRow, startCol, endRow, endCol) {
  let range = getRangeFromMatrix(matrix, startRow, startCol, endRow, endCol)
  if (!isArray(range)) range = [range]
  else range = flattenOften(range, 2)
  return range
}