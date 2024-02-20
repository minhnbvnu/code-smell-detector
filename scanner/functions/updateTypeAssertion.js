function updateTypeAssertion(node, type, expression) {
                return node.type !== type || node.expression !== expression ? update(createTypeAssertion(type, expression), node) : node;
            }