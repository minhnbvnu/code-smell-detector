function isBooleanCast(expression, scope) {
        return expression.type === "CallExpression" &&
            expression.callee.name === "Boolean" &&
            expression.arguments.length === 1 &&
            astUtils.isReferenceToGlobalVariable(scope, expression.callee);
    }