function isUndefinedIdentifier(i) {
        return i.type === utils_1.AST_NODE_TYPES.Identifier && i.name === 'undefined';
    }