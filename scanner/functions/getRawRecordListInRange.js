async function getRawRecordListInRange (projectId, startAt, endAt, countType) {
  let timeList = DatabaseUtil.getDatabaseTimeList(startAt, endAt, countType)
  let tableName = getTableName(projectId, startAt)
  let rawRecordList = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('project_id', projectId)
    .andWhere('count_type', countType)
    .whereIn('count_at_time', timeList)
    .catch(err => {
      Logger.error('unique_view => getRawRecordListInRange', err.message)
      return []
    })
  return rawRecordList
}