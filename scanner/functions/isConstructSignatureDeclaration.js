function isConstructSignatureDeclaration(node) {
        return node.kind === ts.SyntaxKind.ConstructSignature;
    }