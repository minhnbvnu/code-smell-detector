function ifNodeOrRelatedHasChanged (node, change, cb) {
  let doc = node.getDocument()
  let id = node.id
  let hasChanged = change.hasUpdated(id)
  if (!hasChanged) {
    let relationships = doc.getIndex('relationships')
    // TODO: this could probably be improved by only navigating updated nodes
    let ids = Object.keys(change.updated)
    for (let _id of ids) {
      let related = relationships.get(_id)
      if (related && related.has(id)) {
        hasChanged = true
        break
      }
    }
  }
  if (hasChanged) cb()
}