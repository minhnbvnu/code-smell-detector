function updateLiteralTypeNode(node, literal) {
                return node.literal !== literal ? update(createLiteralTypeNode(literal), node) : node;
            }