async function getErrorCountForAlarm (projectId, errName, startAt, endAt) {
  const tableName = getTableName(projectId, startAt)
  const whereParams = {}
  if (errName !== '*') {
    whereParams['error_name'] = errName
  }
  const rawRecordList = await Knex
    .count('id as error_count')
    .from(tableName)
    .where(whereParams)
    .andWhere('log_at', '>=', startAt)
    .andWhere('log_at', '<=', endAt)
    .catch(err => {
      Logger.log(err.message, '=========>查询报警配置对应的错误数')
      return []
    })
  return _.get(rawRecordList, ['0', 'error_count'], 0)
}