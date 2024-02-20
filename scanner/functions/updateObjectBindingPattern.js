function updateObjectBindingPattern(node, elements) {
                return node.elements !== elements ? update(createObjectBindingPattern(elements), node) : node;
            }