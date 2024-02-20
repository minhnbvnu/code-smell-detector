async function getRecordListInRange (projectId, startAt, endAt) {
  // @todo(hanqingxin) 应统一使用startAt计算表名
  const tableName = getTableName(projectId, endAt)
  const rawRecordList = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('log_at', '>', startAt)
    .andWhere('log_at', '<', endAt)
    .catch(err => {
      Logger.warn(err.message)
      return []
    })
  return rawRecordList
}