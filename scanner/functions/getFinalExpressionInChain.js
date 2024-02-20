function getFinalExpressionInChain(node) {
            node = skipParentheses(node);
            if (isBinaryExpression(node)) {
                return getFinalExpressionInChain(node.left);
            }
            else if ((isPropertyAccessExpression(node) || isElementAccessExpression(node) || isCallExpression(node)) && !isOptionalChain(node)) {
                return node;
            }
            return void 0;
        }