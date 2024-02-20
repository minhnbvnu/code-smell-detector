function isMethodSignature(node) {
        return node.kind === ts.SyntaxKind.MethodSignature;
    }