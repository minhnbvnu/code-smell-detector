function isToken(node) {
        return (node.kind >= SyntaxKind.FirstToken && node.kind <= SyntaxKind.LastToken);
    }