function updatePropertyAccessExpression(node, expression, name) {
                if (isPropertyAccessChain(node)) {
                    return updatePropertyAccessChain(node, expression, node.questionDotToken, cast(name, isIdentifier));
                }
                return node.expression !== expression || node.name !== name ? update(createPropertyAccessExpression(expression, name), node) : node;
            }