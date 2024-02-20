function TreeView_UnhoverNode(node) {
    if (!node.hoverClass) {
        return;
    }
    WebForm_RemoveClassName(node, node.hoverClass);
    if (__nonMSDOMBrowser) {
        node = node.childNodes[node.childNodes.length - 1];
    }
    else {
        node = node.children[node.children.length - 1];
    }
    WebForm_RemoveClassName(node, node.hoverHyperLinkClass);
}