function maybeAddMissingProcessVars() {
  if (semver.gte(process.version, '19.0.0')) {
    addSetting(remapping.node_use_dtrace, 'no')
    addSetting(remapping.node_use_etw, 'no')
  }
}