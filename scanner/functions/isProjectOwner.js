async function isProjectOwner (projectId, ucid) {
  let record = await getByProjectIdAndUcid(projectId, ucid)
  if (_.isEmpty(record)) {
    return false
  }
  let isExist = _.get(record, ['is_delete'], 1) === 0
  let isOwner = _.get(record, ['role'], ROLE_DEV) === ROLE_OWNER
  if (isExist && isOwner) {
    return true
  }
  return false
}