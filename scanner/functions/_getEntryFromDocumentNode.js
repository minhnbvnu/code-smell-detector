function _getEntryFromDocumentNode (documentNode) {
  return {
    id: documentNode.id,
    path: documentNode.path,
    type: documentNode.documentType,
    name: documentNode.name
  }
}