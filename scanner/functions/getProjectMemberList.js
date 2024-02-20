async function getProjectMemberList (projectId) {
  const tableName = getTableName()
  const result = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('project_id', projectId)
    .andWhere('is_delete', 0)
    .catch(err => {
      Logger.log(err.message, 'project_member    getMemberIdList   出错')
      return []
    })
  return result
}