function isJsDoc(node) {
        return node.kind === ts.SyntaxKind.JSDocComment;
    }