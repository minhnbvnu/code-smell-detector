function getNextToken(node, sourceFile) {
        if (node.kind === ts.SyntaxKind.SourceFile || node.kind === ts.SyntaxKind.EndOfFileToken)
            return;
        const end = node.end;
        node = node.parent;
        while (node.end === end) {
            if (node.parent === undefined)
                return node.endOfFileToken;
            node = node.parent;
        }
        return getTokenAtPositionWorker(node, end, sourceFile !== null && sourceFile !== void 0 ? sourceFile : node.getSourceFile(), false);
    }