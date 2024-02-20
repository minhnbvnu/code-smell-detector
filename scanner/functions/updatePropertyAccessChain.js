function updatePropertyAccessChain(node, expression, questionDotToken, name) {
                Debug.assert(!!(node.flags & 32 /* OptionalChain */), "Cannot update a PropertyAccessExpression using updatePropertyAccessChain. Use updatePropertyAccess instead.");
                return node.expression !== expression || node.questionDotToken !== questionDotToken || node.name !== name ? update(createPropertyAccessChain(expression, questionDotToken, name), node) : node;
            }