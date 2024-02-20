function parseExpressionWithTypeArguments() {
                        const pos = getNodePos();
                        const expression = parseLeftHandSideExpressionOrHigher();
                        if (expression.kind === 230 /* ExpressionWithTypeArguments */) {
                            return expression;
                        }
                        const typeArguments = tryParseTypeArguments();
                        return finishNode(factory2.createExpressionWithTypeArguments(expression, typeArguments), pos);
                    }