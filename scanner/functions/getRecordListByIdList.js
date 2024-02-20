async function getRecordListByIdList (projectId, createAt, idList = []) {
  let tableName = getTableName(projectId, createAt)
  let rawRecordList = Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .whereIn('id', idList)
    .catch(e => {
      Logger.warn('getRecordListByIdList查询失败 => ', e)
      return []
    })
  return rawRecordList
}