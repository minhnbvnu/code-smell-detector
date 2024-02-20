function setCommentRange(node, range) {
            getOrCreateEmitNode(node).commentRange = range;
            return node;
        }