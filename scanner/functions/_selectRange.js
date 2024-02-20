function _selectRange (tableComp, startRowIdx, startColIdx, endRowIdx, endColIdx) {
  let rows = tableComp.findAll('tr')
  let startRow = rows[startRowIdx]
  let startCell = startRow.findAll('td, th')[startColIdx]
  let endRow = rows[endRowIdx]
  let endCell = endRow.findAll('td, th')[endColIdx]
  // HACK: using some private API here because I don't know how to emulate the
  // mouse-move selection gesture
  tableComp._requestSelectionChange(tableComp._createTableSelection({ anchorCellId: startCell.props.node.id, focusCellId: endCell.props.node.id }))
}