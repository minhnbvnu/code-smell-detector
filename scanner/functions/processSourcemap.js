function processSourcemap (sourcemap) {
    delete sourcemap.file
    sourcemap.sourcesContent = sourcemap.sources.map(importer.readFile)
    sourcemap.sources = sourcemap.sources.map((filePath) => {
      return parseImportPath(filePath) || filePath
    })

    return sourcemap
  }