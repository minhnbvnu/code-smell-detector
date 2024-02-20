function removeAllComments(node) {
            const emitNode = getOrCreateEmitNode(node);
            emitNode.flags |= 3072 /* NoComments */;
            emitNode.leadingComments = void 0;
            emitNode.trailingComments = void 0;
            return node;
        }