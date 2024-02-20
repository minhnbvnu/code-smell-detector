function isConstructorArgument(node) {
        return node.type === utils_1.AST_NODE_TYPES.NewExpression;
    }