async function updateErrorSummaryRecord (id, projectId, countAt, countType, errorType, errorName, urlPath, errorCount) {
  const tableName = getTableName(projectId, countAt)
  const countAtTime = moment.unix(countAt).format(DATE_FORMAT.DATABASE_BY_UNIT[countType])
  const updateTime = moment().unix()
  const updateData = {
    error_type: errorType,
    error_name: errorName,
    url_path: urlPath,
    count_at_time: countAtTime,
    count_type: countType,
    error_count: errorCount,
    update_time: updateTime
  }
  const affecRows = await Knex(tableName)
    .update(updateData)
    .where('id', id)
    .catch((err) => {
      Logger.error(err.message)
      return 0
    })
  return affecRows > 0
}