function TreeView_SelectNode(data, node, nodeId) {
    if (!data) {
        return;
    }
    if ((typeof(data.selectedClass) != "undefined") && (data.selectedClass != null)) {
        var id = data.selectedNodeID.value;
        if (id.length > 0) {
            var selectedNode = document.getElementById(id);
            if ((typeof(selectedNode) != "undefined") && (selectedNode != null)) {
                WebForm_RemoveClassName(selectedNode, data.selectedHyperLinkClass);
                selectedNode = WebForm_GetParentByTagName(selectedNode, "TD");
                WebForm_RemoveClassName(selectedNode, data.selectedClass);
            }
        }
        WebForm_AppendToClassName(node, data.selectedHyperLinkClass);
        node = WebForm_GetParentByTagName(node, "TD");
        WebForm_AppendToClassName(node, data.selectedClass)
    }
    data.selectedNodeID.value = nodeId;
}