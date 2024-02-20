function getPropertySymbolsFromContextualType(node, checker, contextualType, unionSymbolOk) {
            const name = getNameFromPropertyName(node.name);
            if (!name)
                return emptyArray;
            if (!contextualType.isUnion()) {
                const symbol = contextualType.getProperty(name);
                return symbol ? [symbol] : emptyArray;
            }
            const discriminatedPropertySymbols = mapDefined(contextualType.types, (t) => (isObjectLiteralExpression(node.parent) || isJsxAttributes(node.parent)) && checker.isTypeInvalidDueToUnionDiscriminant(t, node.parent) ? void 0 : t.getProperty(name));
            if (unionSymbolOk && (discriminatedPropertySymbols.length === 0 || discriminatedPropertySymbols.length === contextualType.types.length)) {
                const symbol = contextualType.getProperty(name);
                if (symbol)
                    return [symbol];
            }
            if (discriminatedPropertySymbols.length === 0) {
                return mapDefined(contextualType.types, (t) => t.getProperty(name));
            }
            return discriminatedPropertySymbols;
        }