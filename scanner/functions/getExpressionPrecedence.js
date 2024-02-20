function getExpressionPrecedence(expression) {
            const operator = getOperator(expression);
            const hasArguments = expression.kind === 211 /* NewExpression */ && expression.arguments !== void 0;
            return getOperatorPrecedence(expression.kind, operator, hasArguments);
        }