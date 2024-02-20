async function getRecord (projectId, countAtTime, countType) {
  let tableName = getTableName()
  let recordList = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('project_id', '=', projectId)
    .andWhere('count_at_time', '=', countAtTime)
    .andWhere('count_type', '=', countType)
    .catch(e => {
      return []
    })
  return _.get(recordList, [0], {})
}