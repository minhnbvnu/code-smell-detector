function isThisInTypeQuery(node) {
        if (!isThisIdentifier(node)) {
            return false;
        }
        while (ts.isQualifiedName(node.parent) && node.parent.left === node) {
            node = node.parent;
        }
        return node.parent.kind === SyntaxKind.TypeQuery;
    }