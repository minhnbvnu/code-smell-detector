function isJsxElementOrFragment(node) {
        return node.kind === ts.SyntaxKind.JsxElement || node.kind === ts.SyntaxKind.JsxFragment;
    }