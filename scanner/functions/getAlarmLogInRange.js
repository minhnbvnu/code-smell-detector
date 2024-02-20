async function getAlarmLogInRange (projectId, startAt, endAt) {
  const tableName = getTableName()
  const result = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('send_at', '>', startAt)
    .andWhere('send_at', '<', endAt)
    .andWhere('project_id', projectId)
    .catch((err) => {
      Logger.error(err.message)
      return []
    })
  return result
}