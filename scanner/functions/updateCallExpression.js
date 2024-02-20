function updateCallExpression(node, expression, typeArguments, argumentsArray) {
                if (isCallChain(node)) {
                    return updateCallChain(node, expression, node.questionDotToken, typeArguments, argumentsArray);
                }
                return node.expression !== expression || node.typeArguments !== typeArguments || node.arguments !== argumentsArray ? update(createCallExpression(expression, typeArguments, argumentsArray), node) : node;
            }