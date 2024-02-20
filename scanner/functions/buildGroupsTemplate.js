function buildGroupsTemplate(groups) {
  return groups.reduce((acc, group) => {
    acc[group] = []
    return acc
  }, {})
}