function renderableNode(node) {
    return (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
}