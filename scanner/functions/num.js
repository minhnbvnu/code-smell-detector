function num (column, value) {
  let col = index[column]
  let n = col.findIndex(val => val == value)
  if (n >= 0) return n
  col.push(value)
  return col.length-1
}