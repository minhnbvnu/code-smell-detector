async function getLineAlarmLogInRange (projectId, startAt, endAt) {
  const tableName = getTableName()
  let sqlGroupByFormat = DATE_FORMAT.SQL_GROUP_BY_HOUR
  const resultList = await Knex
    .count('* as log_count')
    .select('config_id', 'error_name', Knex.raw(`FROM_UNIXTIME(\`send_at\`, '${sqlGroupByFormat}') as group_by`))
    .from(tableName)
    .where('send_at', '>', startAt)
    .andWhere('send_at', '<', endAt)
    .andWhere('project_id', projectId)
    .groupBy('config_id', 'error_name', 'group_by')
    .catch(err => {
      Logger.error(err.message)
      return []
    })
  return resultList
}