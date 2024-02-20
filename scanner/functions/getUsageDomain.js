function getUsageDomain(node) {
        const parent = node.parent;
        switch (parent.kind) {
            case ts.SyntaxKind.TypeReference:
                return node.originalKeywordKind !== ts.SyntaxKind.ConstKeyword ? 2 /* Type */ : undefined;
            case ts.SyntaxKind.ExpressionWithTypeArguments:
                return parent.parent.token === ts.SyntaxKind.ImplementsKeyword ||
                    parent.parent.parent.kind === ts.SyntaxKind.InterfaceDeclaration
                    ? 2 /* Type */
                    : 4 /* Value */;
            case ts.SyntaxKind.TypeQuery:
                return 5 /* ValueOrNamespace */ | 8 /* TypeQuery */;
            case ts.SyntaxKind.QualifiedName:
                if (parent.left === node) {
                    if (getEntityNameParent(parent).kind === ts.SyntaxKind.TypeQuery)
                        return 1 /* Namespace */ | 8 /* TypeQuery */;
                    return 1 /* Namespace */;
                }
                break;
            case ts.SyntaxKind.ExportSpecifier:
                // either {name} or {propertyName as name}
                if (parent.propertyName === undefined ||
                    parent.propertyName === node)
                    return 7 /* Any */; // TODO handle type-only exports
                break;
            case ts.SyntaxKind.ExportAssignment:
                return 7 /* Any */;
            // Value
            case ts.SyntaxKind.BindingElement:
                if (parent.initializer === node)
                    return 5 /* ValueOrNamespace */;
                break;
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.EnumMember:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.PropertyAssignment:
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.ImportEqualsDeclaration:
                if (parent.name !== node)
                    return 5 /* ValueOrNamespace */; // TODO handle type-only imports
                break;
            case ts.SyntaxKind.JsxAttribute:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.NamespaceImport:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.LabeledStatement:
            case ts.SyntaxKind.BreakStatement:
            case ts.SyntaxKind.ContinueStatement:
            case ts.SyntaxKind.ImportClause:
            case ts.SyntaxKind.ImportSpecifier:
            case ts.SyntaxKind.TypePredicate: // TODO this actually references a parameter
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.NamespaceExportDeclaration:
            case ts.SyntaxKind.NamespaceExport:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.TypeParameter:
            case ts.SyntaxKind.NamedTupleMember:
                break;
            default:
                return 5 /* ValueOrNamespace */;
        }
    }