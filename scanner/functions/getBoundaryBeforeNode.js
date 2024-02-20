function getBoundaryBeforeNode(node) {
        return new DomPosition(node.parentNode, dom.getNodeIndex(node));
    }