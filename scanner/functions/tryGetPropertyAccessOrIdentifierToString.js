function tryGetPropertyAccessOrIdentifierToString(expr) {
            if (isPropertyAccessExpression(expr)) {
                const baseStr = tryGetPropertyAccessOrIdentifierToString(expr.expression);
                if (baseStr !== void 0) {
                    return baseStr + "." + entityNameToString(expr.name);
                }
            }
            else if (isElementAccessExpression(expr)) {
                const baseStr = tryGetPropertyAccessOrIdentifierToString(expr.expression);
                if (baseStr !== void 0 && isPropertyName(expr.argumentExpression)) {
                    return baseStr + "." + getPropertyNameForPropertyNameNode(expr.argumentExpression);
                }
            }
            else if (isIdentifier(expr)) {
                return unescapeLeadingUnderscores(expr.escapedText);
            }
            return void 0;
        }