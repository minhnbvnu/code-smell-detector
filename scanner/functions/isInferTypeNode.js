function isInferTypeNode(node) {
        return node.kind === ts.SyntaxKind.InferType;
    }