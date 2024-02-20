function getPReactCommands() {
  return {
    ...prefixKeys('react.', getCommands()),
    ...prefixKeys('preact.', getCommands({preact: true})),
  }
}