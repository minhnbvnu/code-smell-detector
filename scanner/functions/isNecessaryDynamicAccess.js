function isNecessaryDynamicAccess(property) {
        if (property.type !== utils_1.AST_NODE_TYPES.Literal) {
            return false;
        }
        if (typeof property.value === 'number') {
            return true;
        }
        return (typeof property.value === 'string' &&
            !tsutils.isValidPropertyAccess(property.value));
    }