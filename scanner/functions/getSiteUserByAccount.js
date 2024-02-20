async function getSiteUserByAccount (account) {
  const tableName = getTableName()

  const result = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('account', account)
    .andWhere('register_type', REGISTER_TYPE_SITE)
  let user = _.get(result, [0], {})
  return user
}