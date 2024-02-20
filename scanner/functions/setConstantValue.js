function setConstantValue(node, value) {
            const emitNode = getOrCreateEmitNode(node);
            emitNode.constantValue = value;
            return node;
        }