function setupWithScripts(scripts = ['test', 'lint', 'build', 'typecheck']) {
  return function setup() {
    const utils = require('../../utils')
    const originalIfScript = utils.ifScript
    utils.ifScript = (script, t, f) => (scripts.includes(script) ? t : f)
    return function teardown() {
      utils.ifScript = originalIfScript
    }
  }
}