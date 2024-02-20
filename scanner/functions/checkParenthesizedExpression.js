function checkParenthesizedExpression(node, checkMode) {
                if (hasJSDocNodes(node)) {
                    if (isJSDocSatisfiesExpression(node)) {
                        return checkSatisfiesExpressionWorker(node.expression, getJSDocSatisfiesExpressionType(node), checkMode);
                    }
                    if (isJSDocTypeAssertion(node)) {
                        const type = getJSDocTypeAssertionType(node);
                        return checkAssertionWorker(type, type, node.expression, checkMode);
                    }
                }
                return checkExpression(node.expression, checkMode);
            }