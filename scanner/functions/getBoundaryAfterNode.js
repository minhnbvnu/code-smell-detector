function getBoundaryAfterNode(node) {
        return new DomPosition(node.parentNode, dom.getNodeIndex(node) + 1);
    }