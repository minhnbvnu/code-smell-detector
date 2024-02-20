function getLiteralMethodKeyName(node) {
        if (node.computed && node.key.type === types_1.AST_NODE_TYPES.Literal) {
            if (typeof node.key.value === 'string' ||
                typeof node.key.value === 'number') {
                return node.key.value;
            }
        }
        else if (!node.computed && node.key.type === types_1.AST_NODE_TYPES.Identifier) {
            return node.key.name;
        }
        return null;
    }