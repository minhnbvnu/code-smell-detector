async function getByProjectIdAndUcid (projectId, ucid) {
  let tableName = getTableName()
  let rawRecord = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('project_id', projectId)
    .andWhere('ucid', ucid)
    .catch(err => {
      Logger.log(err.message, 'project_member    getList   出错')
      return []
    })

  let record = _.get(rawRecord, [0], {})
  return record
}