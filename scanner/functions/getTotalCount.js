async function getTotalCount (params) {
  const { tableName, where, splitBy, projectId } = params
  const table = getTableName(tableName, splitBy, projectId)
  let res = await Knex(table).count('id as count').where(where)
  const count = _.get(res, [0, 'count'], 0)
  return count
}