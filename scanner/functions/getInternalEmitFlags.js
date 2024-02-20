function getInternalEmitFlags(node) {
            const emitNode = node.emitNode;
            return emitNode && emitNode.internalFlags || 0;
        }