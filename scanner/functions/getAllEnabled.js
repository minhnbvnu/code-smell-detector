async function getAllEnabled () {
  const tableName = getTableName()
  const result = await Knex(tableName)
    .select(TABLE_COLUMN)
    .where('is_delete', 0)
    .where('is_enable', 1)
    .catch(err => {
      Logger.log(err, '==================>获取报警配置总数出错_数据库_getAllEnabled')
      return []
    })
  return result
}