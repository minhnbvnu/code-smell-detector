async function mapSourcePosition(position, caches) {
  let sourceMap = caches.sourceMap[position.source]

  if (!sourceMap) {
    const urlAndMap = retrieveSourceMap(position.source, caches)
    if (urlAndMap) {
      sourceMap = {
        url: urlAndMap.url,
        rawMap: urlAndMap.map,
        map: await new SourceMapConsumer(urlAndMap.map),
      }

      caches.sourceMap[position.source] = sourceMap

      // Load all sources stored inline with the source map into the file cache
      // to pretend like they are already loaded. They may not exist on disk.
      if (sourceMap.map.sourcesContent) {
        sourceMap.map.sources.forEach((source, i) => {
          const contents = sourceMap.map.sourcesContent[i]
          if (contents) {
            const url = supportRelativeURL(sourceMap.url, source)
            caches.fileContents[url] = contents
          }
        })
      }
    } else {
      sourceMap = {
        url: null,
        rawMap: null,
        map: null,
      }

      caches.sourceMap[position.source] = sourceMap
    }
  }

  // Resolve the source URL relative to the URL of the source map
  if (sourceMap && sourceMap.map) {
    const originalPosition = sourceMap.map.originalPositionFor({
      line: parseInt(position.line, 10),
      column: parseInt(position.column, 10),
    })

    // Only return the original position if a matching line was found. If no
    // matching line is found then we return position instead, which will cause
    // the stack trace to print the path and line for the compiled file. It is
    // better to give a precise location in the compiled file than a vague
    // location in the original file.
    if (originalPosition.source !== null) {
      originalPosition.source = supportRelativeURL(
        sourceMap.url,
        originalPosition.source
      )
      return originalPosition
    }
  }

  return position
}