function updateNamedExports(node, elements) {
                return node.elements !== elements ? update(createNamedExports(elements), node) : node;
            }