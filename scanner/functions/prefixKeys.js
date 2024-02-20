function prefixKeys(prefix, object) {
  return Object.entries(object).reduce((cmds, [key, value]) => {
    cmds[`${prefix}${key}`] = value
    return cmds
  }, {})
}