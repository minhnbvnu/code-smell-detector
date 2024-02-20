function updateThrowStatement(node, expression) {
                return node.expression !== expression ? update(createThrowStatement(expression), node) : node;
            }