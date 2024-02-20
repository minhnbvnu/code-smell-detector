function addEmitHelpers(node, helpers) {
            if (some(helpers)) {
                const emitNode = getOrCreateEmitNode(node);
                for (const helper of helpers) {
                    emitNode.helpers = appendIfUnique(emitNode.helpers, helper);
                }
            }
            return node;
        }