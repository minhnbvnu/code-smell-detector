async function getByIdListInOneMonth (projectId, cityDistributionIdList, createTimeAt) {
  const talbeName = getTableName(projectId, createTimeAt)
  const rawRecordList = await Knex
    .select(TABLE_COLUMN)
    .from(talbeName)
    .whereIn('id', cityDistributionIdList)
    .catch(err => {
      Logger.error('citydistribution => getByIdListInOneMonth:', err.message)
      return []
    })
  return rawRecordList
}