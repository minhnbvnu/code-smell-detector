function findUp(node, type, shouldStop) {
        if (!node || shouldStop(node)) {
            return null;
        }
        if (node.type === type) {
            return node;
        }
        return findUp(node.parent, type, shouldStop);
    }