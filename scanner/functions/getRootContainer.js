function getRootContainer(node) {
        var parent;
        while ( (parent = node.parentNode) ) {
            node = parent;
        }
        return node;
    }