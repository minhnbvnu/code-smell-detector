function getEmitFlags(node) {
            const emitNode = node.emitNode;
            return emitNode && emitNode.flags || 0;
        }