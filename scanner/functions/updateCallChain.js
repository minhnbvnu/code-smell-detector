function updateCallChain(node, expression, questionDotToken, typeArguments, argumentsArray) {
                Debug.assert(!!(node.flags & 32 /* OptionalChain */), "Cannot update a CallExpression using updateCallChain. Use updateCall instead.");
                return node.expression !== expression || node.questionDotToken !== questionDotToken || node.typeArguments !== typeArguments || node.arguments !== argumentsArray ? update(createCallChain(expression, questionDotToken, typeArguments, argumentsArray), node) : node;
            }