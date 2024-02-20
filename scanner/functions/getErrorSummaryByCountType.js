async function getErrorSummaryByCountType (projectId, startAt, endAt, countType) {
  let tableName = getTableName(projectId, startAt)
  let timeList = DatabaseUtil.getDatabaseTimeList(startAt, endAt, countType)
  let rawResultList = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('count_type', countType)
    .whereIn('count_at_time', timeList)
    .catch(err => {
      Logger.error('getErrorSummary', err.message)
      return []
    })
  return rawResultList
}