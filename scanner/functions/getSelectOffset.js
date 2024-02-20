async function getSelectOffset (params, limit, offset) {
  const { tableName, where, splitBy, projectId } = params
  const table = getTableName(tableName, splitBy, projectId)
  const datas = await Knex(table)
    .select()
    .where(where)
    .limit(limit)
    .offset(offset)
  return datas
}