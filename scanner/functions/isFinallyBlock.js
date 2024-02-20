function isFinallyBlock(node) {
                return node.parent.type === "TryStatement" && node.parent.finalizer === node;
            }