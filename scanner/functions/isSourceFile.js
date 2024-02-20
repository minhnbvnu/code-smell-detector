function isSourceFile(node) {
        return node.kind === ts.SyntaxKind.SourceFile;
    }