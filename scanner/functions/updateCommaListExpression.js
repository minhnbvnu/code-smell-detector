function updateCommaListExpression(node, elements) {
                return node.elements !== elements ? update(createCommaListExpression(elements), node) : node;
            }