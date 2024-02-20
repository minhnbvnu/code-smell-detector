function _updateNestedIfChangedRaw(remote, local, remoteKey, localKey) {
  return this.mergeServerConfig.updateNestedIfChanged(
    this,
    remote,
    local,
    remoteKey,
    localKey,
    logger
  )
}