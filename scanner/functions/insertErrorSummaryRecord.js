async function insertErrorSummaryRecord (projectId, countAt, countType, errorType, errorName, urlPath, cityDistributionId, errorCount) {
  const tableName = getTableName(projectId, countAt)
  const countAtTime = moment.unix(countAt).format(DATE_FORMAT.DATABASE_BY_UNIT[countType])
  const createTime = moment().unix()
  const insertData = {
    error_type: errorType,
    error_name: errorName,
    url_path: urlPath,
    city_distribution_id: cityDistributionId,
    count_at_time: countAtTime,
    count_type: countType,
    error_count: errorCount,
    create_time: createTime,
    update_time: createTime
  }
  const result = await Knex
    .returning('id')
    .insert(insertData)
    .into(tableName)
    .catch((err) => {
      Logger.error(err.message)
      return [0]
    })
  return _.get(result, [0], 0) > 0
}