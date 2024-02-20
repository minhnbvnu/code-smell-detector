function updateTupleTypeNode(node, elements) {
                return node.elements !== elements ? update(createTupleTypeNode(elements), node) : node;
            }