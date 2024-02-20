function containsAllTypesByName(type, allowAny, allowedNames, matchAnyInstead = false) {
        if ((0, typeFlagUtils_1.isTypeFlagSet)(type, ts.TypeFlags.Any | ts.TypeFlags.Unknown)) {
            return !allowAny;
        }
        if ((0, tsutils_1.isTypeReference)(type)) {
            type = type.target;
        }
        const symbol = type.getSymbol();
        if (symbol && allowedNames.has(symbol.name)) {
            return true;
        }
        const predicate = (t) => containsAllTypesByName(t, allowAny, allowedNames, matchAnyInstead);
        if ((0, tsutils_1.isUnionOrIntersectionType)(type)) {
            return matchAnyInstead
                ? type.types.some(predicate)
                : type.types.every(predicate);
        }
        const bases = type.getBaseTypes();
        return (bases !== undefined &&
            (matchAnyInstead
                ? bases.some(predicate)
                : bases.length > 0 && bases.every(predicate)));
    }