function getCalledExpressionName(expr) {
            if (isIdentifier(expr)) {
                return expr.text;
            }
            else if (isPropertyAccessExpression(expr)) {
                const left = getCalledExpressionName(expr.expression);
                const right = expr.name.text;
                return left === void 0 ? right : `${left}.${right}`;
            }
            else {
                return void 0;
            }
        }