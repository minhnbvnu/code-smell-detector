function isJsxSpreadAttribute(node) {
        return node.kind === ts.SyntaxKind.JsxSpreadAttribute;
    }