function setSyntheticLeadingComments(node, comments) {
            getOrCreateEmitNode(node).leadingComments = comments;
            return node;
        }