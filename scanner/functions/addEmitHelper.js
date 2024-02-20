function addEmitHelper(node, helper) {
            const emitNode = getOrCreateEmitNode(node);
            emitNode.helpers = append(emitNode.helpers, helper);
            return node;
        }