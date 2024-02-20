function updateArrayBindingPattern(node, elements) {
                return node.elements !== elements ? update(createArrayBindingPattern(elements), node) : node;
            }