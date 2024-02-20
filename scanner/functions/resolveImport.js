function resolveImport (dependencyManager) {
  return function (url, prev, done) {
    let resolvedFilename
    url = url.replace(/^["']?(.*?)["']?$/, '$1')
    if (url.indexOf('~') === 0 || url.indexOf('/') === 0) {
      resolvedFilename = url.substr(1)
    /* } else if (url.indexOf('{') === 0) {
      resolvedFilename = decodeFilePath(url) */
    } else {
      let currentDirectory = path.dirname(prev === 'stdin' ? this.options.outFile : prev)
      resolvedFilename = path.resolve(currentDirectory, url)
    }
    const importPaths = [resolvedFilename]
    const pkg = require('package.json') // can not be moved outside. Reqired here to get the package.json of the project that is being run

    try {
      // get the package.json config option and create paths for the requested file.
      pkg.vue.css.sass.includePaths.forEach((str) => {
        importPaths.push(path.resolve(str, url))
      })
    } catch (e) {
      // Ignore error. package.json option is not set.
    }

    const resolvedNames = importPaths.map(discoverImportPath).filter(
      fileName => fileName !== null && typeof fileName !== 'undefined'
    )

    if (resolvedNames.length < 1) {
      done(new Error('Unknown import (file not found): ' + url))
    } else {
      dependencyManager.addDependency(resolvedNames[0])

      done({
        file: resolvedNames[0],
      })
    }
  }
}