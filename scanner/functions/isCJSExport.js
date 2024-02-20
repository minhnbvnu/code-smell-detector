function isCJSExport(node) {
        if (node.type === utils_1.AST_NODE_TYPES.ExpressionStatement) {
            const expression = node.expression;
            if (expression.type === utils_1.AST_NODE_TYPES.AssignmentExpression) {
                let left = expression.left;
                if (left.type === utils_1.AST_NODE_TYPES.MemberExpression) {
                    while (left.object.type === utils_1.AST_NODE_TYPES.MemberExpression) {
                        left = left.object;
                    }
                    return (left.object.type === utils_1.AST_NODE_TYPES.Identifier &&
                        (left.object.name === 'exports' ||
                            (left.object.name === 'module' &&
                                left.property.type === utils_1.AST_NODE_TYPES.Identifier &&
                                left.property.name === 'exports')));
                }
            }
        }
        return false;
    }