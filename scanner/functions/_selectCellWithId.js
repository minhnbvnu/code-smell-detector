function _selectCellWithId (tableComp, id) {
  let cell = _getCellComponentById(tableComp, id)
  tableComp._onMousedown(new DOMEvent({ target: cell.getNativeElement() }))
  cell.el.click()
  return cell
}