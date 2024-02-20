function isTypeNodeKind(kind) {
        return kind >= ts.SyntaxKind.FirstTypeNode && kind <= ts.SyntaxKind.LastTypeNode;
    }