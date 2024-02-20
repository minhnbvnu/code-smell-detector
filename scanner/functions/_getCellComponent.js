function _getCellComponent (tableComp, rowIdx, colIdx) {
  let rows = tableComp.findAll('tr')
  let cells = rows[rowIdx].findAll('td, th')
  return cells[colIdx]
}