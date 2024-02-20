async function getExistUuidSetInHour (projectId, visitAt) {
  let visitAtHour = moment.unix(visitAt).format(VisitAtHourDateFormat)
  let tableName = getTableName(projectId, visitAt)
  let rawRecordList = await Knex
    .select('uuid')
    .from(tableName)
    .where('visit_at_hour', '=', visitAtHour)
    .catch(e => {
      return []
    })
  let uuidSet = new Set()
  for (let rawRecord of rawRecordList) {
    let uuid = _.get(rawRecord, ['uuid'], '')
    uuidSet.add(uuid)
  }
  return uuidSet
}