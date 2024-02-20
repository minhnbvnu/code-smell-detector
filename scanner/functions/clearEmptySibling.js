function clearEmptySibling(node) {
        var tmpNode = node.previousSibling;
        if (tmpNode && domUtils.isEmptyBlock(tmpNode)) {
            domUtils.remove(tmpNode);
        }
        tmpNode = node.nextSibling;
        if (tmpNode && domUtils.isEmptyBlock(tmpNode)) {
            domUtils.remove(tmpNode);
        }
    }