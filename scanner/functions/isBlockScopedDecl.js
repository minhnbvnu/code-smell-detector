function isBlockScopedDecl(node) {
    return node.type == "VariableDeclaration" && node.kind != "var" || node.type == "FunctionDeclaration" || node.type == "ClassDeclaration";
  }