function isJsxAttributeLike(node) {
        return node.kind === ts.SyntaxKind.JsxAttribute ||
            node.kind === ts.SyntaxKind.JsxSpreadAttribute;
    }