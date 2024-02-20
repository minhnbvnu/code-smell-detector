function isPromiseCatchCallWithHandler(expression) {
        return (expression.callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
            expression.callee.property.type === utils_1.AST_NODE_TYPES.Identifier &&
            expression.callee.property.name === 'catch' &&
            expression.arguments.length >= 1);
    }