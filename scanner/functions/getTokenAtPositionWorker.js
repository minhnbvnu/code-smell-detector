function getTokenAtPositionWorker(node, pos, sourceFile, allowJsDoc) {
        if (!allowJsDoc) {
            // if we are not interested in JSDoc, we can skip to the deepest AST node at the given position
            node = getAstNodeAtPosition(node, pos);
            if (isTokenKind(node.kind))
                return node;
        }
        outer: while (true) {
            for (const child of node.getChildren(sourceFile)) {
                if (child.end > pos && (allowJsDoc || child.kind !== ts.SyntaxKind.JSDocComment)) {
                    if (isTokenKind(child.kind))
                        return child;
                    // next token is nested in another node
                    node = child;
                    continue outer;
                }
            }
            return;
        }
    }