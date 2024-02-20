function isCallSignatureDeclaration(node) {
        return node.kind === ts.SyntaxKind.CallSignature;
    }