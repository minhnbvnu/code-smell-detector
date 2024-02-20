function getVariableDeclarationKind(declarationList) {
        if (declarationList.flags & ts.NodeFlags.Let)
            return 1 /* Let */;
        if (declarationList.flags & ts.NodeFlags.Const)
            return 2 /* Const */;
        return 0 /* Var */;
    }