function is_used_as_reference(node2, parent) {
    if (!is_reference(node2, parent)) {
      return false;
    }
    if (!parent) {
      return true;
    }
    switch (parent.type) {
      case "VariableDeclarator":
        return node2 !== parent.id;
      case "FunctionDeclaration":
      case "ImportSpecifier":
      case "ImportDefaultSpecifier":
      case "ImportNamespaceSpecifier":
      case "ExportSpecifier":
        return false;
      default:
        return true;
    }
  }