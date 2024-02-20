function getDeclarationKind(node) {
        if (node.flags & ts.NodeFlags.Let) {
            return 'let';
        }
        if (node.flags & ts.NodeFlags.Const) {
            return 'const';
        }
        return 'var';
    }