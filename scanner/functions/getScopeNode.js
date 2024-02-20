function getScopeNode(node) {
        for (let currentNode = node; currentNode; currentNode = currentNode.parent) {
            if (SCOPE_NODE_TYPE.test(currentNode.type)) {
                return currentNode;
            }
        }
        /* c8 ignore next */
        return null;
    }