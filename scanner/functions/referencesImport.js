function referencesImport(moduleSource, importName) {
  if (!this.isReferencedIdentifier()) return false;
  const binding = this.scope.getBinding(this.node.name);
  if (!binding || binding.kind !== "module") return false;
  const path = binding.path;
  const parent = path.parentPath;
  if (!parent.isImportDeclaration()) return false;

  if (parent.node.source.value === moduleSource) {
    if (!importName) return true;
  } else {
    return false;
  }

  if (path.isImportDefaultSpecifier() && importName === "default") {
    return true;
  }

  if (path.isImportNamespaceSpecifier() && importName === "*") {
    return true;
  }

  if (path.isImportSpecifier() && path.node.imported.name === importName) {
    return true;
  }

  return false;
}