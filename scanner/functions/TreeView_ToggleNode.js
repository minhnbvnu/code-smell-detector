function TreeView_ToggleNode(data, index, node, lineType, children) {
    if (!data) {
        return;
    }
    var img = node.childNodes[0];
    var newExpandState;
    try {
        if (children.style.display == "none") {
            children.style.display = "block";
            newExpandState = "e";
            if ((typeof(img) != "undefined") && (img != null)) {
                if (lineType == "l") {
                    img.src = data.images[15];
                }
                else if (lineType == "t") {
                    img.src = data.images[12];
                }
                else if (lineType == "-") {
                    img.src = data.images[18];
                }
                else {
                    img.src = data.images[5];
                }
                img.alt = data.collapseToolTip.replace(/\{0\}/, TreeView_GetNodeText(node));
            }
        }
        else {
            children.style.display = "none";
            newExpandState = "c";
            if ((typeof(img) != "undefined") && (img != null)) {
                if (lineType == "l") {
                    img.src = data.images[14];
                }
                else if (lineType == "t") {
                    img.src = data.images[11];
                }
                else if (lineType == "-") {
                    img.src = data.images[17];
                }
                else {
                    img.src = data.images[4];
                }
                img.alt = data.expandToolTip.replace(/\{0\}/, TreeView_GetNodeText(node));
            }
        }
    }
    catch(e) {}
    data.expandState.value =  data.expandState.value.substring(0, index) + newExpandState + data.expandState.value.slice(index + 1);
}