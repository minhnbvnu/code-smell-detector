async function getUserListByUcid (memberUcidList) {
  const tableName = getTableName()
  const result = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .whereIn('ucid', memberUcidList)
    .catch(err => {
      Logger.log(err.message, 'getMemberListByUcid出错')
      return []
    })
  return result
}