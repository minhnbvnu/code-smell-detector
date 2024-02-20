function isBlockScopedVariableDeclaration(declaration) {
        const parent = declaration.parent;
        return parent.kind === ts.SyntaxKind.CatchClause ||
            isBlockScopedVariableDeclarationList(parent);
    }