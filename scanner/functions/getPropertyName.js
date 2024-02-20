function getPropertyName(propertyName) {
        if (propertyName.kind === ts.SyntaxKind.ComputedPropertyName) {
            const expression = unwrapParentheses(propertyName.expression);
            if (node_1.isPrefixUnaryExpression(expression)) {
                let negate = false;
                switch (expression.operator) {
                    case ts.SyntaxKind.MinusToken:
                        negate = true;
                    // falls through
                    case ts.SyntaxKind.PlusToken:
                        return node_1.isNumericLiteral(expression.operand)
                            ? `${negate ? '-' : ''}${expression.operand.text}`
                            : _3_2_1.isBigIntLiteral(expression.operand)
                                ? `${negate ? '-' : ''}${expression.operand.text.slice(0, -1)}`
                                : undefined;
                    default:
                        return;
                }
            }
            if (_3_2_1.isBigIntLiteral(expression))
                // handle BigInt, even though TypeScript doesn't allow BigInt as computed property name
                return expression.text.slice(0, -1);
            if (node_1.isNumericOrStringLikeLiteral(expression))
                return expression.text;
            return;
        }
        return propertyName.kind === ts.SyntaxKind.PrivateIdentifier ? undefined : propertyName.text;
    }