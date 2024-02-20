async function hasPrivilege (projectId, ucid) {
  // 检查是否是项目1，如果是，则通过（默认项目1是展示项目，都会有权限）
  if (_.indexOf(ProjectConfig.OPEN_PROJECT_ID_LIST, projectId) >= 0) {
    return true
  }
  // 检查是否是admin,如果是，直接通过检查
  const isAdmin = await MUser.isAdmin(ucid)
  if (isAdmin) {
    return true
  }
  // 不是admin
  let record = await getByProjectIdAndUcid(projectId, ucid)
  if (_.isEmpty(record)) {
    return false
  }
  let isExist = _.get(record, ['is_delete'], 1) === 0
  return isExist
}