function canHaveJsDoc(node) {
        const kind = node.kind;
        switch (kind) {
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.CallSignature:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.ParenthesizedExpression:
            case ts.SyntaxKind.SpreadAssignment:
            case ts.SyntaxKind.ShorthandPropertyAssignment:
            case ts.SyntaxKind.PropertyAssignment:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.LabeledStatement:
            case ts.SyntaxKind.ExpressionStatement:
            case ts.SyntaxKind.VariableStatement:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.EnumMember:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.ImportEqualsDeclaration:
            case ts.SyntaxKind.ImportDeclaration:
            case ts.SyntaxKind.NamespaceExportDeclaration:
            case ts.SyntaxKind.ExportAssignment:
            case ts.SyntaxKind.IndexSignature:
            case ts.SyntaxKind.FunctionType:
            case ts.SyntaxKind.ConstructorType:
            case ts.SyntaxKind.JSDocFunctionType:
            case ts.SyntaxKind.ExportDeclaration:
            case ts.SyntaxKind.NamedTupleMember:
            case ts.SyntaxKind.EndOfFileToken:
                return true;
            default:
                return false;
        }
    }