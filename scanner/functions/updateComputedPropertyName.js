function updateComputedPropertyName(node, expression) {
                return node.expression !== expression ? update(createComputedPropertyName(expression), node) : node;
            }