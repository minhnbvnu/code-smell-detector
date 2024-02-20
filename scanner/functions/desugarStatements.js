function desugarStatements(node) {
    node.children.forEach(desugarStatement);
}