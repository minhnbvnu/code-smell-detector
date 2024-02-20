function getCellRange (table, anchorCellId, focusCellId) {
  let anchorCell = table.get(anchorCellId)
  let focusCell = table.get(focusCellId)
  let startRow = Math.min(anchorCell.rowIdx, focusCell.rowIdx)
  let startCol = Math.min(anchorCell.colIdx, focusCell.colIdx)
  let endRow = Math.max(anchorCell.rowIdx + anchorCell.rowspan - 1, focusCell.rowIdx + focusCell.rowspan - 1)
  let endCol = Math.max(anchorCell.colIdx + anchorCell.colspan - 1, focusCell.colIdx + focusCell.colspan - 1)
  return { startRow, startCol, endRow, endCol }
}