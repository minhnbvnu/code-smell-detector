function parseJsDocOfNode(node, considerTrailingComments, sourceFile = node.getSourceFile()) {
        if (canHaveJsDoc(node) && node.kind !== ts.SyntaxKind.EndOfFileToken) {
            const result = getJsDoc(node, sourceFile);
            if (result.length !== 0 || !considerTrailingComments)
                return result;
        }
        return parseJsDocWorker(node, node.getStart(sourceFile), sourceFile, considerTrailingComments);
    }