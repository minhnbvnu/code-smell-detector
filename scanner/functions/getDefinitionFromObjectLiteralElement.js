function getDefinitionFromObjectLiteralElement(typeChecker, node) {
            const element = getContainingObjectLiteralElement(node);
            if (element) {
                const contextualType = element && typeChecker.getContextualType(element.parent);
                if (contextualType) {
                    return flatMap(getPropertySymbolsFromContextualType(element, typeChecker, contextualType, 
                    /*unionSymbolOk*/
                    false), (propertySymbol) => getDefinitionFromSymbol(typeChecker, propertySymbol, node));
                }
            }
        }