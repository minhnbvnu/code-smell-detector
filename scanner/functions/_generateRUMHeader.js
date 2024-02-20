function _generateRUMHeader(options = {}, metadata, loader) {
  const formatArgs = []

  if (options.hasToRemoveScriptWrapper) {
    formatArgs.push(RUM_STUB)
  } else if (options.nonce) {
    formatArgs.push(RUM_STUB_SHELL_WITH_NONCE_PARAM, `nonce="${options.nonce}"`)
  } else {
    formatArgs.push(RUM_STUB_SHELL)
  }

  formatArgs.push(metadata, loader)

  return util.format(...formatArgs)
}