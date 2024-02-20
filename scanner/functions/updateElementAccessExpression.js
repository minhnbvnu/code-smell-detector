function updateElementAccessExpression(node, expression, argumentExpression) {
                if (isElementAccessChain(node)) {
                    return updateElementAccessChain(node, expression, node.questionDotToken, argumentExpression);
                }
                return node.expression !== expression || node.argumentExpression !== argumentExpression ? update(createElementAccessExpression(expression, argumentExpression), node) : node;
            }