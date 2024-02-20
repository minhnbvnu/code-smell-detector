function WebFrameworkShim(agent, moduleName, resolvedName, shimName, pkgVersion) {
  TransactionShim.call(this, agent, moduleName, resolvedName, shimName, pkgVersion)
  this._logger = logger.child({ module: moduleName })
  this._routeParser = _defaultRouteParser
  this._errorPredicate = _defaultErrorPredicate
  this._responsePredicate = _defaultResponsePredicate
}