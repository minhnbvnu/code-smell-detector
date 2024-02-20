function computeUpdatedSelection (table, selData, dr, dc, expand) {
  let focusCellId = selData.focusCellId
  let focusCell = table.get(focusCellId)
  let rowIdx = focusCell.rowIdx
  let colIdx = focusCell.colIdx
  let rowspan = focusCell.rowspan
  let colspan = focusCell.colspan
  let newFocusCell
  if (dr) {
    if (dr < 0) {
      newFocusCell = table.getCell(rowIdx + dr, colIdx)
    } else if (dr > 0) {
      newFocusCell = table.getCell(rowIdx + rowspan - 1 + dr, colIdx)
    }
  } else if (dc) {
    if (dc < 0) {
      newFocusCell = table.getCell(rowIdx, colIdx + dc)
    } else if (dc > 0) {
      newFocusCell = table.getCell(rowIdx, colIdx + colspan - 1 + dc)
    }
  }
  if (newFocusCell) {
    if (newFocusCell.shadowed) newFocusCell = newFocusCell.masterCell
    let newFocusCellId = newFocusCell.id
    let newAnchorCellId = selData.anchorCellId
    if (!expand) {
      newAnchorCellId = newFocusCellId
    }
    return {
      anchorCellId: newAnchorCellId,
      focusCellId: newFocusCellId
    }
  } else {
    return selData
  }
}