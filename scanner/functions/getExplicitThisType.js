function getExplicitThisType(node) {
                const container = getThisContainer(node, 
                /*includeArrowFunctions*/
                false, 
                /*includeClassComputedPropertyName*/
                false);
                if (isFunctionLike(container)) {
                    const signature = getSignatureFromDeclaration(container);
                    if (signature.thisParameter) {
                        return getExplicitTypeOfSymbol(signature.thisParameter);
                    }
                }
                if (isClassLike(container.parent)) {
                    const symbol = getSymbolOfDeclaration(container.parent);
                    return isStatic(container) ? getTypeOfSymbol(symbol) : getDeclaredTypeOfSymbol(symbol).thisType;
                }
            }