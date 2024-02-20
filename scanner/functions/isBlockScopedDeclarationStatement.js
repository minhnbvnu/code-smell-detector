function isBlockScopedDeclarationStatement(statement) {
        switch (statement.kind) {
            case ts.SyntaxKind.VariableStatement:
                return isBlockScopedVariableDeclarationList(statement.declarationList);
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
                return true;
            default:
                return false;
        }
    }