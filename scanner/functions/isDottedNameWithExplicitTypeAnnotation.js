function isDottedNameWithExplicitTypeAnnotation(node, checker) {
        while (true) {
            switch (node.kind) {
                case ts.SyntaxKind.Identifier: {
                    const symbol = checker.getExportSymbolOfSymbol(checker.getSymbolAtLocation(node));
                    return isExplicitlyTypedSymbol(util_1.isSymbolFlagSet(symbol, ts.SymbolFlags.Alias) ? checker.getAliasedSymbol(symbol) : symbol, checker);
                }
                case ts.SyntaxKind.ThisKeyword:
                    return isExplicitlyTypedThis(node);
                case ts.SyntaxKind.SuperKeyword:
                    return true;
                case ts.SyntaxKind.PropertyAccessExpression:
                    if (!isExplicitlyTypedSymbol(checker.getSymbolAtLocation(node), checker))
                        return false;
                // falls through
                case ts.SyntaxKind.ParenthesizedExpression:
                    node = node.expression;
                    continue;
                default:
                    return false;
            }
        }
    }