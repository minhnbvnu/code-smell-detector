function getExistence(expression, scope) {
        const isNegated = expression.type === "UnaryExpression" && expression.operator === "!";
        const base = isNegated ? expression.argument : expression;
        switch (true) {
            case isReference(base):
                return { reference: base, operator: isNegated ? "||" : "&&" };
            case base.type === "UnaryExpression" && base.operator === "!" && isReference(base.argument):
                return { reference: base.argument, operator: "&&" };
            case isBooleanCast(base, scope) && isReference(base.arguments[0]):
                return { reference: base.arguments[0], operator: isNegated ? "||" : "&&" };
            case isImplicitNullishComparison(expression, scope):
                return { reference: isReference(expression.left) ? expression.left : expression.right, operator: "??" };
            case isExplicitNullishComparison(expression, scope):
                return { reference: isReference(expression.left.left) ? expression.left.left : expression.left.right, operator: "??" };
            default: return null;
        }
    }