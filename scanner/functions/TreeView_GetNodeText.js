function TreeView_GetNodeText(node) {
    var trNode = WebForm_GetParentByTagName(node, "TR");
    var outerNodes;
    if (trNode.childNodes[trNode.childNodes.length - 1].getElementsByTagName) {
        outerNodes = trNode.childNodes[trNode.childNodes.length - 1].getElementsByTagName("A");
        if (!outerNodes || outerNodes.length == 0) {
            outerNodes = trNode.childNodes[trNode.childNodes.length - 1].getElementsByTagName("SPAN");
        }
    }
    var textNode = (outerNodes && outerNodes.length > 0) ?
        outerNodes[0].childNodes[0] :
        trNode.childNodes[trNode.childNodes.length - 1].childNodes[0];
    return (textNode && textNode.nodeValue) ? textNode.nodeValue : "";
}