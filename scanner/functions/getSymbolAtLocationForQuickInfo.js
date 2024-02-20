function getSymbolAtLocationForQuickInfo(node, checker) {
            const object = getContainingObjectLiteralElement(node);
            if (object) {
                const contextualType = checker.getContextualType(object.parent);
                const properties = contextualType && getPropertySymbolsFromContextualType(object, checker, contextualType, 
                /*unionSymbolOk*/
                false);
                if (properties && properties.length === 1) {
                    return first(properties);
                }
            }
            return checker.getSymbolAtLocation(node);
        }