function updateOptionalTypeNode(node, type) {
                return node.type !== type ? update(createOptionalTypeNode(type), node) : node;
            }