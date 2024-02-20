function updateTypeOperatorNode(node, type) {
                return node.type !== type ? update(createTypeOperatorNode(node.operator, type), node) : node;
            }