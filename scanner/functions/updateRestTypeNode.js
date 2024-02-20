function updateRestTypeNode(node, type) {
                return node.type !== type ? update(createRestTypeNode(type), node) : node;
            }