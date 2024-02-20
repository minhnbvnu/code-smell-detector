function _shadowSpanned (matrix, row, col, rowspan, colspan, masterCell) {
  if (!rowspan && !colspan) return
  for (let i = row; i <= row + rowspan - 1; i++) {
    for (let j = col; j <= col + colspan - 1; j++) {
      if (i === row && j === col) continue
      let cell = matrix[i][j]
      cell.shadowed = true
      cell.masterCell = masterCell
    }
  }
}