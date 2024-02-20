function wrapConnect(shim) {
  this.monitorCommands = true
  this.on('commandStarted', cmdStartedHandler.bind(this, shim))
  return { callback: shim.LAST }
}