function isJSXToken(node) {
        return (node.kind >= SyntaxKind.JsxElement && node.kind <= SyntaxKind.JsxAttribute);
    }