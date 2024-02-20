function visitNonOptionalCallExpression(node, captureThisArg) {
                if (isOptionalChain(node)) {
                    return visitOptionalExpression(node, captureThisArg, 
                    /*isDelete*/
                    false);
                }
                if (isParenthesizedExpression(node.expression) && isOptionalChain(skipParentheses(node.expression))) {
                    const expression = visitNonOptionalParenthesizedExpression(node.expression, 
                    /*captureThisArg*/
                    true, 
                    /*isDelete*/
                    false);
                    const args = visitNodes2(node.arguments, visitor, isExpression);
                    if (isSyntheticReference(expression)) {
                        return setTextRange(factory2.createFunctionCallCall(expression.expression, expression.thisArg, args), node);
                    }
                    return factory2.updateCallExpression(node, expression, 
                    /*typeArguments*/
                    void 0, args);
                }
                return visitEachChild(node, visitor, context);
            }