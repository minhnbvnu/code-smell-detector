async function getNewUserDistribution (projectId, countType, timeList) {
  const tableName = getTableName()
  let rawRecordList = Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('project_id', projectId)
    .andWhere('count_type', countType)
    .whereIn('count_at_time', timeList)
    .catch(err => {
      Logger.error(err.message, '======getNewUserDistribution')
      return []
    })
  return rawRecordList
}