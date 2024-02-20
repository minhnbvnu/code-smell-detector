function isBlockScopeBoundary(node) {
        switch (node.kind) {
            case ts.SyntaxKind.Block:
                const parent = node.parent;
                return parent.kind !== ts.SyntaxKind.CatchClause &&
                    // blocks inside SourceFile are block scope boundaries
                    (parent.kind === ts.SyntaxKind.SourceFile ||
                        // blocks that are direct children of a function scope boundary are no scope boundary
                        // for example the FunctionBlock is part of the function scope of the containing function
                        !isFunctionScopeBoundary(parent))
                    ? 2 /* Block */
                    : 0 /* None */;
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.CaseBlock:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.WithStatement:
                return 2 /* Block */;
            default:
                return 0 /* None */;
        }
    }