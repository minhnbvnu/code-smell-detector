function _getCellComponentById (tableComp, id) {
  return tableComp.find(`.sc-table-cell[data-id="${id}"]`)
}