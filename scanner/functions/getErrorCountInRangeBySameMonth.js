async function getErrorCountInRangeBySameMonth (projectId, startAt, finishAt) {
  const tableName = getTableName(projectId, startAt)
  let rawRecordList = await Knex
    .count('* as error_count')
    .from(tableName)
    .where('log_at', '>', startAt)
    .andWhere('log_at', '<', finishAt)
    .catch(e => {
      return []
    })
  let errorCount = _.get(rawRecordList, [0, 'error_count'], 0)
  return errorCount
}