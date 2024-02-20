function isTokenKind(kind) {
        return kind >= ts.SyntaxKind.FirstToken && kind <= ts.SyntaxKind.LastToken;
    }