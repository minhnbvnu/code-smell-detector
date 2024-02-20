async function getDistinct (params) {
  const { tableName, where, distinctName } = params
  const datas = await Knex(tableName).select().distinct(distinctName).where(where)
  return datas
}