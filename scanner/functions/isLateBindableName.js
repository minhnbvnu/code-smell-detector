function isLateBindableName(node) {
                if (!isComputedPropertyName(node) && !isElementAccessExpression(node)) {
                    return false;
                }
                const expr = isComputedPropertyName(node) ? node.expression : node.argumentExpression;
                return isEntityNameExpression(expr) && isTypeUsableAsPropertyName(isComputedPropertyName(node) ? checkComputedPropertyName(node) : checkExpressionCached(expr));
            }