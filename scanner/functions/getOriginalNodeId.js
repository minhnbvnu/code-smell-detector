function getOriginalNodeId(node) {
            node = getOriginalNode(node);
            return node ? getNodeId(node) : 0;
        }