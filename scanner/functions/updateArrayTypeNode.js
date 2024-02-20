function updateArrayTypeNode(node, elementType) {
                return node.elementType !== elementType ? update(createArrayTypeNode(elementType), node) : node;
            }