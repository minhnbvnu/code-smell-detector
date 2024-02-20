function getLateBoundPropertyNames(node, checker) {
        const result = {
            known: true,
            names: [],
        };
        node = unwrapParentheses(node);
        if (isTsBefore43 && isWellKnownSymbolLiterally(node)) {
            result.names.push(getPropertyNameOfWellKnownSymbol(node)); // wotan-disable-line no-unstable-api-use
        }
        else {
            const type = checker.getTypeAtLocation(node);
            for (const key of type_1.unionTypeParts(checker.getBaseConstraintOfType(type) || type)) {
                const propertyName = type_1.getPropertyNameFromType(key);
                if (propertyName) {
                    result.names.push(propertyName);
                }
                else {
                    result.known = false;
                }
            }
        }
        return result;
    }