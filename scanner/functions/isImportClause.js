function isImportClause(node) {
        return node.kind === ts.SyntaxKind.ImportClause;
    }