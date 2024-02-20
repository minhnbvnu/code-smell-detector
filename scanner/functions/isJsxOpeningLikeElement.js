function isJsxOpeningLikeElement(node) {
        return node.kind === ts.SyntaxKind.JsxOpeningElement ||
            node.kind === ts.SyntaxKind.JsxSelfClosingElement;
    }