async function getCityDistributionRecord (id, projectId, createTimeAt) {
  let tableName = getTableName(projectId, createTimeAt)
  let recordList = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('id', '=', id)
    .catch(e => {
      return []
    })
  let resultJson = _.get(recordList, [0, 'city_distribute_json'], '{}')
  let result = {}
  try {
    result = JSON.parse(resultJson)
    return result
  } catch (e) {
    return {}
  }
}