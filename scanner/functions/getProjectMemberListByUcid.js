async function getProjectMemberListByUcid (ucid, offset, max) {
  const tableName = getTableName()
  let rawRecordList = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('ucid', ucid)
    .andWhere('is_delete', 0)
    .offset(offset)
    .limit(max)
    .catch(err => {
      Logger.log(err.message, 'project_member    getProjectIdList   出错')
      return []
    })

  // 获取默认项目列表，造数据添加权限
  let templateRecord = {
    id: 0,
    ucid,
    role: ROLE_DEV,
    need_alarm: 0,
    is_delete: 0,
    create_time: 0,
    create_ucid: 0,
    update_time: 0,
    update_ucid: 0
  }
  let projectMemberMap = {}
  for (let rawRecord of rawRecordList) {
    const { project_id: projectId } = rawRecord
    projectMemberMap[projectId] = 1
  }
  for (let openProjectId of ProjectConfig.OPEN_PROJECT_ID_LIST) {
    if (_.has(projectMemberMap, [openProjectId]) === false) {
      let template = {
        ...templateRecord,
        project_id: openProjectId
      }
      rawRecordList.push(template)
    }
  }
  return rawRecordList
}