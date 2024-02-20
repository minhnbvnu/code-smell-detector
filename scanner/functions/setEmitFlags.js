function setEmitFlags(node, emitFlags) {
            getOrCreateEmitNode(node).flags = emitFlags;
            return node;
        }