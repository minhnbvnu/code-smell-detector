function isCatchClauseVariableDeclaration(node) {
            return node.kind === 257 /* VariableDeclaration */ && node.parent.kind === 295 /* CatchClause */;
        }