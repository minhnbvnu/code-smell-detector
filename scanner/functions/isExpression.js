function isExpression(node, sourceCode) {
        return (node.type === utils_1.AST_NODE_TYPES.ExpressionStatement &&
            !isDirectivePrologue(node, sourceCode));
    }