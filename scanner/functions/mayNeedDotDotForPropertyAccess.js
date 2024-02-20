function mayNeedDotDotForPropertyAccess(expression) {
                expression = skipPartiallyEmittedExpressions(expression);
                if (isNumericLiteral(expression)) {
                    const text = getLiteralTextOfNode(expression, 
                    /*neverAsciiEscape*/
                    true, 
                    /*jsxAttributeEscape*/
                    false);
                    return !expression.numericLiteralFlags && !stringContains(text, tokenToString(24 /* DotToken */));
                }
                else if (isAccessExpression(expression)) {
                    const constantValue = getConstantValue(expression);
                    return typeof constantValue === "number" && isFinite(constantValue) && Math.floor(constantValue) === constantValue;
                }
            }