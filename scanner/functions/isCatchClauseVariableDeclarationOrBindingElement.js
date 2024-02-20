function isCatchClauseVariableDeclarationOrBindingElement(declaration) {
            const node = getRootDeclaration(declaration);
            return node.kind === 257 /* VariableDeclaration */ && node.parent.kind === 295 /* CatchClause */;
        }