function _updateNestedIfChanged(remote, local, remoteKey, localKey) {
  // if high-sec mode is enabled, we do not accept server changes to high-sec
  if (this.high_security && HSM.HIGH_SECURITY_KEYS.indexOf(remoteKey) !== -1) {
    return this.logDisabled(remote, remoteKey)
  }
  return this._updateNestedIfChangedRaw(remote, local, remoteKey, localKey)
}