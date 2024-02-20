function isIIFEStatement(node) {
        if (node.type === utils_1.AST_NODE_TYPES.ExpressionStatement) {
            let expression = skipChainExpression(node.expression);
            if (expression.type === utils_1.AST_NODE_TYPES.UnaryExpression) {
                expression = skipChainExpression(expression.argument);
            }
            if (expression.type === utils_1.AST_NODE_TYPES.CallExpression) {
                let node = expression.callee;
                while (node.type === utils_1.AST_NODE_TYPES.SequenceExpression) {
                    node = node.expressions[node.expressions.length - 1];
                }
                return util.isFunction(node);
            }
        }
        return false;
    }