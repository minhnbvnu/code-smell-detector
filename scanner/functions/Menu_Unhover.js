function Menu_Unhover(item) {
    var node = (item.tagName.toLowerCase() == "td") ?
        item:
        item.cells[0];
    var nodeTable = WebForm_GetElementByTagName(node, "table");
    if (nodeTable.hoverClass) {
        WebForm_RemoveClassName(nodeTable, nodeTable.hoverClass);
    }
    node = nodeTable.rows[0].cells[0].childNodes[0];
    if (node.hoverHyperLinkClass) {
        WebForm_RemoveClassName(node, node.hoverHyperLinkClass);
    }
    Menu_Collapse(node);
}