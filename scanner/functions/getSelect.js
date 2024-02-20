async function getSelect (params) {
  const { tableName, where, splitBy, projectId } = params
  const table = getTableName(tableName, splitBy, projectId)
  const datas = await Knex(table).select().where(where)
  return datas
}