function isCallLikeExpression(node) {
        switch (node.kind) {
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.Decorator:
            case ts.SyntaxKind.JsxOpeningElement:
            case ts.SyntaxKind.JsxSelfClosingElement:
            case ts.SyntaxKind.NewExpression:
            case ts.SyntaxKind.TaggedTemplateExpression:
                return true;
            default:
                return false;
        }
    }