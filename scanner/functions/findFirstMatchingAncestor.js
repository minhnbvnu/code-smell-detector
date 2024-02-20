function findFirstMatchingAncestor(node, predicate) {
        while (node) {
            if (predicate(node)) {
                return node;
            }
            node = node.parent;
        }
        return undefined;
    }