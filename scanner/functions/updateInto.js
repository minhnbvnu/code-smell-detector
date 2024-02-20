async function updateInto (params) {
  const { projectId, tableName, where, splitBy, datas } = params
  let updateAt = moment().unix()
  datas['update_time'] = updateAt
  const TableName = getTableName(tableName, splitBy, projectId)
  return Knex(TableName)
    .where(where)
    .update(datas)
    .catch(() => { return 0 })
}