function hasTypeImportKind(node) {
  return node.importKind === "type" || node.importKind === "typeof";
}