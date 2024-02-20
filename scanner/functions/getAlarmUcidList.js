async function getAlarmUcidList (projectId) {
  const tableName = getTableName()
  const rawRecordList = await Knex
    .select('ucid')
    .from(tableName)
    .where('project_id', projectId)
    .andWhere('need_alarm', 1)
    .catch(() => {
      return []
    })
  let result = []
  for (let rawRecord of rawRecordList) {
    let ucid = _.get(rawRecord, ['ucid'], 0)
    result.push(ucid)
  }
  return result
}