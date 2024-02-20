function updateExpressionWithTypeArguments(node, expression, typeArguments) {
                return node.expression !== expression || node.typeArguments !== typeArguments ? update(createExpressionWithTypeArguments(expression, typeArguments), node) : node;
            }