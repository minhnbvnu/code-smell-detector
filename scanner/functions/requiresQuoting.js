function requiresQuoting(node, target) {
        const name = node.type === utils_1.AST_NODE_TYPES.Identifier ||
            node.type === utils_1.AST_NODE_TYPES.PrivateIdentifier
            ? node.name
            : `${node.value}`;
        return util.requiresQuoting(name, target);
    }