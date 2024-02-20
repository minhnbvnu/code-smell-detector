function updateSpreadElement(node, expression) {
                return node.expression !== expression ? update(createSpreadElement(expression), node) : node;
            }