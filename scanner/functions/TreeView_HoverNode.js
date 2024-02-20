function TreeView_HoverNode(data, node) {
    if (!data) {
        return;
    }
    node.hoverClass = data.hoverClass;
    WebForm_AppendToClassName(node, data.hoverClass);
    if (__nonMSDOMBrowser) {
        node = node.childNodes[node.childNodes.length - 1];
    }
    else {
        node = node.children[node.children.length - 1];
    }
    node.hoverHyperLinkClass = data.hoverHyperLinkClass;
    WebForm_AppendToClassName(node, data.hoverHyperLinkClass);
}