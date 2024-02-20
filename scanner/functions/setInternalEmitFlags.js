function setInternalEmitFlags(node, emitFlags) {
            getOrCreateEmitNode(node).internalFlags = emitFlags;
            return node;
        }