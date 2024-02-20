function createTypeOfExpression(exprIn, enclosingDeclaration, flags, tracker) {
                const expr = getParseTreeNode(exprIn, isExpression);
                if (!expr) {
                    return factory.createToken(131 /* AnyKeyword */);
                }
                const type = getWidenedType(getRegularTypeOfExpression(expr));
                return nodeBuilder.typeToTypeNode(type, enclosingDeclaration, flags | 1024 /* MultilineObjectLiterals */, tracker);
            }