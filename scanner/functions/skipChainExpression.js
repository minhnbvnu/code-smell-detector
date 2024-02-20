function skipChainExpression(node) {
        return node && node.type === utils_1.AST_NODE_TYPES.ChainExpression
            ? node.expression
            : node;
    }