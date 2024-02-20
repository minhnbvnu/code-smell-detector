function updateNewExpression(node, expression, typeArguments, argumentsArray) {
                return node.expression !== expression || node.typeArguments !== typeArguments || node.arguments !== argumentsArray ? update(createNewExpression(expression, typeArguments, argumentsArray), node) : node;
            }