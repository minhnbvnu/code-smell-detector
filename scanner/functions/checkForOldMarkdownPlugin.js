function checkForOldMarkdownPlugin (config) {
  const { name, options = {} } = config
  if (name === 'nextein-plugin-markdown') {
    const { entriesDir, extension } = options

    if (entriesDir || extension) {
      console.warn('"entriesDir" and "exentension" configs have been removed from markdown plugin.')
      console.warn('Add a "nextein-plugin-source-fs" configuration instead.')
    }
  }
  return config
}