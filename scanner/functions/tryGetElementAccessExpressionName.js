function tryGetElementAccessExpressionName(node) {
                if (isStringOrNumericLiteralLike(node.argumentExpression)) {
                    return escapeLeadingUnderscores(node.argumentExpression.text);
                }
                if (isEntityNameExpression(node.argumentExpression)) {
                    const symbol = resolveEntityName(node.argumentExpression, 111551 /* Value */, 
                    /*ignoreErrors*/
                    true);
                    if (!symbol || !(isConstVariable(symbol) || symbol.flags & 8 /* EnumMember */))
                        return void 0;
                    const declaration = symbol.valueDeclaration;
                    if (declaration === void 0)
                        return void 0;
                    const type = tryGetTypeFromEffectiveTypeNode(declaration);
                    if (type) {
                        const name = tryGetNameFromType(type);
                        if (name !== void 0) {
                            return name;
                        }
                    }
                    if (hasOnlyExpressionInitializer(declaration) && isBlockScopedNameDeclaredBeforeUse(declaration, node.argumentExpression)) {
                        const initializer = getEffectiveInitializer(declaration);
                        if (initializer) {
                            return tryGetNameFromType(getTypeOfExpression(initializer));
                        }
                        if (isEnumMember(declaration)) {
                            return getTextOfPropertyName(declaration.name);
                        }
                    }
                }
                return void 0;
            }