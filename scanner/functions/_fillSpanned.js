function _fillSpanned ($$, newRows, row, col, rowspan, colspan) {
  if (!rowspan && !colspan) return
  if (!rowspan) rowspan = 1
  if (!colspan) colspan = 1
  for (let i = row; i < row + rowspan; i++) {
    for (let j = col; j < col + colspan; j++) {
      if (i === row && j === col) continue
      newRows[i].children[j] = $$('table-cell')
    }
  }
}