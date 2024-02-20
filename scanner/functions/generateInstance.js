function generateInstance () {
  overrides.clearModuleRequireCache()
  return require('blockchain-wallet-client')
}