function isDynamicName(name) {
            if (!(name.kind === 164 /* ComputedPropertyName */ || name.kind === 209 /* ElementAccessExpression */)) {
                return false;
            }
            const expr = isElementAccessExpression(name) ? skipParentheses(name.argumentExpression) : name.expression;
            return !isStringOrNumericLiteralLike(expr) && !isSignedNumericLiteral(expr);
        }