async function copyManifest(manifestJSON) {
  return new Promise((resolve, reject) => {
    const copy = { ...manifestJSON }
    copy.version = manifestJSON.version || skpmConfig.version
    copy.description = manifestJSON.description || skpmConfig.description
    copy.homepage = manifestJSON.homepage || skpmConfig.homepage
    copy.name = manifestJSON.name || skpmConfig.name
    copy.identifier = manifestJSON.identifier || skpmConfig.identifier
    copy.disableCocoaScriptPreprocessor =
      typeof manifestJSON.disableCocoaScriptPreprocessor === 'undefined'
        ? true
        : manifestJSON.disableCocoaScriptPreprocessor

    if (manifestJSON.appcast !== false && skpmConfig.appcast !== false) {
      copy.appcast =
        manifestJSON.appcast || appcastURL(skpmConfig.appcast || '.appcast.xml')
    } else {
      delete copy.appcast
    }

    if (!copy.author && skpmConfig.author) {
      let { author } = skpmConfig
      if (typeof skpmConfig.author === 'string') {
        author = parseAuthor(skpmConfig.author)
      }
      copy.author = author.name
      if (!copy.authorEmail && author.email) {
        copy.authorEmail = author.email
      }
    }

    copy.commands = manifestJSON.commands.map(command => {
      const script = command.script
        .replace(/\.(?![jt]sx?$)|\//g, '_')
        .replace(/[jt]sx?$/, 'js')
      return { ...command, script }
    })

    fs.writeFile(
      path.join(output, 'Contents', 'Sketch', 'manifest.json'),
      JSON.stringify(copy, null, 2),
      err => {
        if (err) {
          reject(new Error(`Error while writing the manifest: ${err.message}`))
          return
        }
        resolve()
      }
    )
  })
}