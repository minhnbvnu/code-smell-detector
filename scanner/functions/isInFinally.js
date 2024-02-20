function isInFinally(node) {
        for (let currentNode = node; currentNode && currentNode.parent && !astUtils.isFunction(currentNode); currentNode = currentNode.parent) {
            if (currentNode.parent.type === "TryStatement" && currentNode.parent.finalizer === currentNode) {
                return true;
            }
        }
        return false;
    }