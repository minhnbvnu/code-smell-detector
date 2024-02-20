function isImportIdentifier(node) {
  return !node.parent || node.parent.type === 'ImportDirective'
}