async function getByAccount (account) {
  const tableName = getTableName()

  const result = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('account', account)
  let user = _.get(result, [0], {})
  return user
}