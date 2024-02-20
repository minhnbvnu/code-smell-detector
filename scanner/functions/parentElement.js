function parentElement(node) {
        var parent = node.parentNode;
        return (parent.nodeType == 1) ? parent : null;
    }