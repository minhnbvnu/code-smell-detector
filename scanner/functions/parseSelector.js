function parseSelector(rawSelector) {
        if (selectorCache.has(rawSelector)) {
            return selectorCache.get(rawSelector);
        }
        const parsedSelector = tryParseSelector(rawSelector);
        const result = {
            rawSelector,
            isExit: rawSelector.endsWith(":exit"),
            parsedSelector,
            listenerTypes: getPossibleTypes(parsedSelector),
            attributeCount: countClassAttributes(parsedSelector),
            identifierCount: countIdentifiers(parsedSelector)
        };
        selectorCache.set(rawSelector, result);
        return result;
    }