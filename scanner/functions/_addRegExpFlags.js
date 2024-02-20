function _addRegExpFlags(re, flags) {
  let foundMissing = false
  let reFlags = re.flags
  for (let i = 0; i < flags.length; ++i) {
    if (reFlags.indexOf(flags[i]) === -1) {
      foundMissing = true
      reFlags += flags[i]
    }
  }
  return foundMissing ? new RegExp(re.source, reFlags) : re
}