function isBlockScopedVariableDeclarationList(declarationList) {
        return (declarationList.flags & ts.NodeFlags.BlockScoped) !== 0;
    }