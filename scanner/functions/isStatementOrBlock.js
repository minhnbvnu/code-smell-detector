function isStatementOrBlock(node) {
            const kind = node.kind;
            return isStatementKindButNotDeclarationKind(kind) || isDeclarationStatementKind(kind) || kind === 238 /* Block */;
        }