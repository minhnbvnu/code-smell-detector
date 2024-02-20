async function getProjectListById (idList) {
  let tableName = getTableName()

  let result = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .whereIn('id', idList)
    .andWhere('is_delete', 0)
    .catch(err => {
      Logger.log(err.message, 'project_item   getProjectListById   出错')
      return []
    })
  return result
}