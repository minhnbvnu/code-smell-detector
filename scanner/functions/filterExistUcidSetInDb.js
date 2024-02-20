async function filterExistUcidSetInDb (projectId, allUcidList) {
  let tableName = getTableName(projectId)
  let rawRecordList = await Knex
    .select('ucid')
    .from(tableName)
    .whereIn('ucid', allUcidList)
  let existUcidSet = new Set()
  for (let rawRecord of rawRecordList) {
    let ucid = _.get(rawRecord, ['ucid'], '')
    existUcidSet.add(ucid)
  }
  return existUcidSet
}