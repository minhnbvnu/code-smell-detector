function updateNonNullChain(node, expression) {
                Debug.assert(!!(node.flags & 32 /* OptionalChain */), "Cannot update a NonNullExpression using updateNonNullChain. Use updateNonNullExpression instead.");
                return node.expression !== expression ? update(createNonNullChain(expression), node) : node;
            }