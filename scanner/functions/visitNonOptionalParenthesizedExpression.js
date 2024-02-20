function visitNonOptionalParenthesizedExpression(node, captureThisArg, isDelete) {
                const expression = visitNonOptionalExpression(node.expression, captureThisArg, isDelete);
                if (isSyntheticReference(expression)) {
                    return factory2.createSyntheticReferenceExpression(factory2.updateParenthesizedExpression(node, expression.expression), expression.thisArg);
                }
                return factory2.updateParenthesizedExpression(node, expression);
            }