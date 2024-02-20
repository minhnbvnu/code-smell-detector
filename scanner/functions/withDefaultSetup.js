function withDefaultSetup(setupFn) {
  return function defaultSetup() {
    const utils = require('../../utils')
    utils.resolveBin = (modName, {executable = modName} = {}) => executable
    const argsTeardown = setupWithArgs()()
    const teardownScripts = setupWithScripts()()
    const teardownFn = setupFn()
    return function defaultTeardown() {
      argsTeardown()
      teardownFn()
      teardownScripts()
    }
  }
}