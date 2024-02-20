function isStatementButNotDeclaration(node) {
            return isStatementKindButNotDeclarationKind(node.kind);
        }