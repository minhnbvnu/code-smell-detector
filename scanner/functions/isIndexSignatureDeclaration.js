function isIndexSignatureDeclaration(node) {
        return node.kind === ts.SyntaxKind.IndexSignature;
    }