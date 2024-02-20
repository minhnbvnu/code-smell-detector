function queryParser(operation) {
  let collection = this.collectionName || 'unknown'

  // cursor methods have collection on namespace.collection
  if (this.namespace && this.namespace.collection) {
    collection = this.namespace.collection
  }

  return { operation, collection }
}