function setupWithArgs(args = []) {
  return function setup() {
    const utils = require('../../utils')
    const originalResolveBin = utils.resolveBin
    utils.resolveBin = (modName, {executable = modName} = {}) => executable
    const originalArgv = process.argv
    process.argv = ['node', '../format', ...args]
    return function teardown() {
      process.argv = originalArgv
      utils.resolveBin = originalResolveBin
    }
  }
}