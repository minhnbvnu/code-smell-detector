function updateElementAccessChain(node, expression, questionDotToken, argumentExpression) {
                Debug.assert(!!(node.flags & 32 /* OptionalChain */), "Cannot update a ElementAccessExpression using updateElementAccessChain. Use updateElementAccess instead.");
                return node.expression !== expression || node.questionDotToken !== questionDotToken || node.argumentExpression !== argumentExpression ? update(createElementAccessChain(expression, questionDotToken, argumentExpression), node) : node;
            }