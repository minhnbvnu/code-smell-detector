function getDefaultSeverity(rule) {
  if (Array.isArray(rule.meta.defaultSetup)) {
    return rule.meta.defaultSetup[0]
  } else {
    return rule.meta.defaultSetup
  }
}