async function insertInto (infos) {
  const { projectId, tableName, splitBy, datas } = infos
  let updateAt = moment().unix()
  if (!datas['create_time']) {
    datas['create_time'] = updateAt
  }
  if (!datas['update_time']) {
    datas['update_time'] = updateAt
  }
  const TableName = getTableName(tableName, splitBy, projectId)
  return Knex(TableName)
    .insert(datas)
    .catch(() => { return 0 })
}