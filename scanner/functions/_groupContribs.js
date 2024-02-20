function _groupContribs (contribs) {
  let groups = new Map()
  groups.set('NOGROUP', [])
  for (let contrib of contribs) {
    let groupId = contrib.group
    if (groupId) {
      if (!groups.has(groupId)) {
        groups.set(groupId, [])
      }
      groups.get(groupId).push(contrib)
    } else {
      groups.get('NOGROUP').push(contrib)
    }
  }
  return groups
}