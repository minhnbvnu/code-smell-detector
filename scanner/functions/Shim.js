function Shim(agent, moduleName, resolvedName, shimName, pkgVersion) {
  if (!agent || !moduleName) {
    throw new Error('Shim must be initialized with an agent and module name.')
  }

  this._logger = logger.child({ module: moduleName })
  this._agent = agent
  this._contextManager = agent._contextManager
  this._toExport = null
  this._debug = false
  this.defineProperty(this, 'moduleName', moduleName)
  this.assignId(shimName)
  this.pkgVersion = pkgVersion

  // Used in `shim.require`
  // If this is a built-in the root is set as `.`
  this._moduleRoot = isBuiltin(resolvedName || moduleName) ? '.' : resolvedName
}