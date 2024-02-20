function MessageShim(agent, moduleName, resolvedName, shimName, pkgVersion) {
  TransactionShim.call(this, agent, moduleName, resolvedName, shimName, pkgVersion)
  this._logger = logger.child({ module: moduleName })
  this._metrics = null
  this._transportType = TransactionShim.TRANSPORT_TYPES.UNKNOWN
}