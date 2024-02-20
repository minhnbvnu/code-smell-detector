async function getCommands(output, entry, options) {
  return Promise.all(
    entry.identifiers.map(commandIdentifier =>
      WebpackCommandPlugin(output, commandIdentifier, options)
    )
  )
}