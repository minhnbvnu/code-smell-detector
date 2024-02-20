function parseImportPath (filePath, importerDir) {
    let resolvedFilename
    if (filePath.indexOf('~') === 0) {
      resolvedFilename = filePath.substr(1)
      /* } else if (filename.indexOf('{') === 0) {
        resolvedFilename = decodeFilePath(filename) */
    } else {
      let currentDirectory = path.dirname(basePath)
      resolvedFilename = path.resolve(currentDirectory, filePath)
    }

    let stats = statOrNull(resolvedFilename)
    if (!stats) {
      return null
    } else if (stats.isDirectory()) {
      resolvedFilename = path.resolve(resolvedFilename, './index.styl')
      if (!statOrNull(resolvedFilename)) {
        return null
      }
    }
    return resolvedFilename
  }