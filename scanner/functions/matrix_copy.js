function matrix_copy(m){
  // TODO: optimize
  return m.map(function(row){ return row.slice(0) })
}