function findBatchQueryArg(_shim, _batch, _fnName, args) {
  const sql = (args[0] && args[0][0]) || ''
  return sql.query || sql
}