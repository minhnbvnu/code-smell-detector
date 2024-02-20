function isDefinitionVisible(checker, declaration) {
            if (checker.isDeclarationVisible(declaration))
                return true;
            if (!declaration.parent)
                return false;
            if (hasInitializer(declaration.parent) && declaration.parent.initializer === declaration)
                return isDefinitionVisible(checker, declaration.parent);
            switch (declaration.kind) {
                case 169 /* PropertyDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 171 /* MethodDeclaration */:
                    if (hasEffectiveModifier(declaration, 8 /* Private */))
                        return false;
                case 173 /* Constructor */:
                case 299 /* PropertyAssignment */:
                case 300 /* ShorthandPropertyAssignment */:
                case 207 /* ObjectLiteralExpression */:
                case 228 /* ClassExpression */:
                case 216 /* ArrowFunction */:
                case 215 /* FunctionExpression */:
                    return isDefinitionVisible(checker, declaration.parent);
                default:
                    return false;
            }
        }