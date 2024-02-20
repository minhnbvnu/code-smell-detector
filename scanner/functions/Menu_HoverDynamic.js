function Menu_HoverDynamic(item) {
    var node = (item.tagName.toLowerCase() == "td") ?
        item:
        item.cells[0];
    var data = Menu_GetData(item);
    if (!data) return;
    var nodeTable = WebForm_GetElementByTagName(node, "table");
    if (data.hoverClass) {
        nodeTable.hoverClass = data.hoverClass;
        WebForm_AppendToClassName(nodeTable, data.hoverClass);
    }
    node = nodeTable.rows[0].cells[0].childNodes[0];
    if (data.hoverHyperLinkClass) {
        node.hoverHyperLinkClass = data.hoverHyperLinkClass;
        WebForm_AppendToClassName(node, data.hoverHyperLinkClass);
    }
    if (data.disappearAfter >= 200) {
        __disappearAfter = data.disappearAfter;
    }
    Menu_Expand(node, data.horizontalOffset, data.verticalOffset); 
}