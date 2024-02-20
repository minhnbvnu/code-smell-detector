function updateArrayLiteralExpression(node, elements) {
                return node.elements !== elements ? update(createArrayLiteralExpression(elements, node.multiLine), node) : node;
            }