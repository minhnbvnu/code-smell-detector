async function checkPrivilege (req, res, next) {
  let ucid = _.get(req, ['fee', 'user', 'ucid'], 0)
  let projectId = _.get(req, ['fee', 'project', 'projectId'], 0)
  // 查询数据库
  let hasPrivilege = await MProjectMember.hasPrivilege(projectId, ucid)
  if (hasPrivilege === false) {
    Logger.log('没有项目权限')
    res.send(API_RES.noPrivilege())
    return
  }
  next()
}