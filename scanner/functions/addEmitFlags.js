function addEmitFlags(node, emitFlags) {
            const emitNode = getOrCreateEmitNode(node);
            emitNode.flags = emitNode.flags | emitFlags;
            return node;
        }