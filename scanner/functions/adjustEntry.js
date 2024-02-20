function adjustEntry(entry, enableDevServer, sockOptions) {
  if (typeof entry === 'string') {
    entry = [entry] // for anonymous single entry points
  }

  if (Array.isArray(entry)) {
    if (enableDevServer) {
      const sockHost = sockOptions.sockHost
        ? `&sockHost=${sockOptions.sockHost}`
        : ''
      const sockPath = sockOptions.sockPath
        ? `&sockPath=${sockOptions.sockPath}`
        : ''
      const sockPort = sockOptions.sockPort
        ? `&sockPort=${sockOptions.sockPort}`
        : ''
      const chunkPathDevServerWithParams = `${chunkPathDevServer}?${sockHost}${sockPath}${sockPort}`
      if (!entry.includes(chunkPathDevServerWithParams)) {
        entry.unshift(chunkPathDevServerWithParams)
      }
    }

    if (!entry.includes(chunkPathBasic)) {
      entry.unshift(chunkPathBasic)
    }
  } else {
    Object.keys(entry).forEach((entryName) => {
      entry[entryName] = adjustEntry(
        entry[entryName],
        enableDevServer,
        sockOptions,
      )
    })
  }

  return entry
}