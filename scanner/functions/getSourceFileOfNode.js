function getSourceFileOfNode(node) {
        while (node && node.kind !== ts.SyntaxKind.SourceFile) {
            node = node.parent;
        }
        return node;
    }