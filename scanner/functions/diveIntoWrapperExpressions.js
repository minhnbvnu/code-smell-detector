function diveIntoWrapperExpressions(node) {
        if (node.type === utils_1.AST_NODE_TYPES.UnaryExpression) {
            return diveIntoWrapperExpressions(node.argument);
        }
        return node;
    }