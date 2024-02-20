function isSetter(node) {
        return (!!node &&
            (node.type === ts_estree_1.AST_NODE_TYPES.MethodDefinition ||
                node.type === ts_estree_1.AST_NODE_TYPES.Property) &&
            node.kind === 'set');
    }