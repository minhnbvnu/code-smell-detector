function isAmbientModule(node) {
        return node.name.kind === ts.SyntaxKind.StringLiteral || (node.flags & ts.NodeFlags.GlobalAugmentation) !== 0;
    }