function getTypeForBindingElementParent(node, checkMode) {
                if (checkMode !== 0 /* Normal */) {
                    return getTypeForVariableLikeDeclaration(node, 
                    /*includeOptionality*/
                    false, checkMode);
                }
                const symbol = getSymbolOfDeclaration(node);
                return symbol && getSymbolLinks(symbol).type || getTypeForVariableLikeDeclaration(node, 
                /*includeOptionality*/
                false, checkMode);
            }