function setOriginalNode(node, original) {
            node.original = original;
            if (original) {
                const emitNode = original.emitNode;
                if (emitNode)
                    node.emitNode = mergeEmitNode(emitNode, node.emitNode);
            }
            return node;
        }