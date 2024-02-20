function updateSpreadAssignment(node, expression) {
                return node.expression !== expression ? update(createSpreadAssignment(expression), node) : node;
            }