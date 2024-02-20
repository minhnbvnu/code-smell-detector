function setSyntheticTrailingComments(node, comments) {
            getOrCreateEmitNode(node).trailingComments = comments;
            return node;
        }