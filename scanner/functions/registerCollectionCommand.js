function registerCollectionCommand (config, itemType, collectionPath, options = {}) {
  let nodeType = options.nodeType || itemType
  config.addCommand(`insert-${itemType}`, AddEntityCommand, {
    type: nodeType,
    collection: collectionPath,
    commandGroup: 'add-entity',
    metadataOnly: true
  })
  if (options.keyboardShortcut) {
    config.addKeyboardShortcut(options.keyboardShortcut, { command: `add-${itemType}` })
  }
}