function bindCallExpressionFlow(node) {
                if (isOptionalChain(node)) {
                    bindOptionalChainFlow(node);
                }
                else {
                    const expr = skipParentheses(node.expression);
                    if (expr.kind === 215 /* FunctionExpression */ || expr.kind === 216 /* ArrowFunction */) {
                        bindEach(node.typeArguments);
                        bindEach(node.arguments);
                        bind(node.expression);
                    }
                    else {
                        bindEachChild(node);
                        if (node.expression.kind === 106 /* SuperKeyword */) {
                            currentFlow = createFlowCall(currentFlow, node);
                        }
                    }
                }
                if (node.expression.kind === 208 /* PropertyAccessExpression */) {
                    const propertyAccess = node.expression;
                    if (isIdentifier(propertyAccess.name) && isNarrowableOperand(propertyAccess.expression) && isPushOrUnshiftIdentifier(propertyAccess.name)) {
                        currentFlow = createFlowMutation(256 /* ArrayMutation */, currentFlow, node);
                    }
                }
            }