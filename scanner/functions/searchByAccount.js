async function searchByAccount (account, offset = 0, max = 10) {
  const tableName = getTableName()
  const rescordList = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('is_delete', '=', 0)
    .andWhere('account', 'like', `%${account}%`)
    .limit(max)
    .offset(offset)
  return rescordList
}