function isIndexedAccessTypeNode(node) {
        return node.kind === ts.SyntaxKind.IndexedAccessType;
    }