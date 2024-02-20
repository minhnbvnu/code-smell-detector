function updateReturnStatement(node, expression) {
                return node.expression !== expression ? update(createReturnStatement(expression), node) : node;
            }