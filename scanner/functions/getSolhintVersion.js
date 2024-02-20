function getSolhintVersion() {
  try {
    // Resolve solhint relative to main entry script, not the formatter
    const solhintPackageJson = require('../../package.json')
    return solhintPackageJson.version
  } catch {
    // Formatter was not called from solhint, return undefined
  }
}