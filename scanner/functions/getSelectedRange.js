function getSelectedRange (table, selData) {
  return getCellRange(table, selData.anchorCellId, selData.focusCellId)
}