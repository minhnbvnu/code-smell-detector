function isMatchingConstructorReference(expr) {
                    return (isPropertyAccessExpression(expr) && idText(expr.name) === "constructor" || isElementAccessExpression(expr) && isStringLiteralLike(expr.argumentExpression) && expr.argumentExpression.text === "constructor") && isMatchingReference(reference, expr.expression);
                }