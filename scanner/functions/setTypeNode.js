function setTypeNode(node, type) {
            const emitNode = getOrCreateEmitNode(node);
            emitNode.typeNode = type;
            return node;
        }