function Menu_HoverRoot(item) {
    var node = (item.tagName.toLowerCase() == "td") ?
        item:
        item.cells[0];
    var data = Menu_GetData(item);
    if (!data) {
        return null;
    }
    var nodeTable = WebForm_GetElementByTagName(node, "table");
    if (data.staticHoverClass) {
        nodeTable.hoverClass = data.staticHoverClass;
        WebForm_AppendToClassName(nodeTable, data.staticHoverClass);
    }
    node = nodeTable.rows[0].cells[0].childNodes[0];
    if (data.staticHoverHyperLinkClass) {
        node.hoverHyperLinkClass = data.staticHoverHyperLinkClass;
        WebForm_AppendToClassName(node, data.staticHoverHyperLinkClass);
    }
    return node;
}