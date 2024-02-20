function _selectCell (tableComp, rowIdx = 1, colIdx = 0) {
  let cell = _getCellComponent(tableComp, rowIdx, colIdx)
  tableComp._onMousedown(new DOMEvent({ target: cell.getNativeElement() }))
  cell.el.click()
  return cell
}