function TransactionShim(agent, moduleName, resolvedName, shimName, pkgVersion) {
  Shim.call(this, agent, moduleName, resolvedName, shimName, pkgVersion)
  this._logger = logger.child({ module: moduleName })
}