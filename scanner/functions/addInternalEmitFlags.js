function addInternalEmitFlags(node, emitFlags) {
            const emitNode = getOrCreateEmitNode(node);
            emitNode.internalFlags = emitNode.internalFlags | emitFlags;
            return node;
        }