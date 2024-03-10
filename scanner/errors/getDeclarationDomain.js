function getDeclarationDomain(node) {
        switch (node.parent.kind) {
            case ts.SyntaxKind.TypeParameter:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
                return 2 /* Type */;
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
                return 2 /* Type */ | 4 /* Value */;
            case ts.SyntaxKind.EnumDeclaration:
                return 7 /* Any */;
            case ts.SyntaxKind.NamespaceImport:
            case ts.SyntaxKind.ImportClause:
                return 7 /* Any */ | 8 /* Import */; // TODO handle type-only imports
            case ts.SyntaxKind.ImportEqualsDeclaration:
            case ts.SyntaxKind.ImportSpecifier:
                return node.parent.name === node
                    ? 7 /* Any */ | 8 /* Import */ // TODO handle type-only imports
                    : undefined;
            case ts.SyntaxKind.ModuleDeclaration:
                return 1 /* Namespace */;
            case ts.SyntaxKind.Parameter:
                if (node.parent.parent.kind === ts.SyntaxKind.IndexSignature || node.originalKeywordKind === ts.SyntaxKind.ThisKeyword)
                    return;
            // falls through
            case ts.SyntaxKind.BindingElement:
            case ts.SyntaxKind.VariableDeclaration:
                return node.parent.name === node ? 4 /* Value */ : undefined;
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
                return 4 /* Value */;
        }
    }