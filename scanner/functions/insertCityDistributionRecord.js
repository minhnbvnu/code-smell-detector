async function insertCityDistributionRecord (cityDistributeJson, projectId, createTimeAt) {
  let tableName = getTableName(projectId, createTimeAt)
  let updateAt = moment().unix()
  let data = {
    city_distribute_json: cityDistributeJson,
    create_time: updateAt,
    update_time: updateAt
  }
  let insertResult = await Knex
    .returning('id')
    .insert(data)
    .into(tableName)
    .catch(e => {
      Logger.warn('城市数据插入失败, 错误原因 =>', e)
      return []
    })
  let insertId = _.get(insertResult, [0], 0)

  return insertId
}