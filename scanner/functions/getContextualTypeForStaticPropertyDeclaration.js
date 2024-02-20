function getContextualTypeForStaticPropertyDeclaration(declaration, contextFlags) {
                const parentType = isExpression(declaration.parent) && getContextualType2(declaration.parent, contextFlags);
                if (!parentType)
                    return void 0;
                return getTypeOfPropertyOfContextualType(parentType, getSymbolOfDeclaration(declaration).escapedName);
            }