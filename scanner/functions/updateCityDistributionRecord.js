async function updateCityDistributionRecord (id, projectId, createTimeAt, cityDistributeJson) {
  let tableName = getTableName(projectId, createTimeAt)
  let updateAt = moment().unix()
  let data = {
    city_distribute_json: cityDistributeJson,
    update_time: updateAt
  }
  let affectRows = await Knex(tableName)
    .update(data)
    .where('id', '=', id)
    .catch(e => {
      Logger.warn('城市数据更新失败, 错误原因 =>', e)
      return 0
    })
  return affectRows > 0
}