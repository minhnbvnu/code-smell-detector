function TreeView_ProcessNodeData(result, context) {
    var treeNode = context.node;
    if (result.length > 0) {
        var ci =  result.indexOf("|", 0);
        context.data.lastIndex = result.substring(0, ci);
        ci = result.indexOf("|", ci + 1);
        var newExpandState = result.substring(context.data.lastIndex.length + 1, ci);
        context.data.expandState.value += newExpandState;
        var chunk = result.substr(ci + 1);
        var newChildren, table;
        if (__nonMSDOMBrowser) {
            var newDiv = document.createElement("div");
            newDiv.innerHTML = chunk;
            table = WebForm_GetParentByTagName(treeNode, "TABLE");
            newChildren = null;
            if ((typeof(table.nextSibling) == "undefined") || (table.nextSibling == null)) {
                table.parentNode.insertBefore(newDiv.firstChild, table.nextSibling);
                newChildren = table.previousSibling;
            }
            else {
                table = table.nextSibling;
                table.parentNode.insertBefore(newDiv.firstChild, table);
                newChildren = table.previousSibling;
            }
            newChildren = document.getElementById(treeNode.id + "Nodes");
        }
        else {
            table = WebForm_GetParentByTagName(treeNode, "TABLE");
            table.insertAdjacentHTML("afterEnd", chunk);
            newChildren = document.all[treeNode.id + "Nodes"];
        }
        if ((typeof(newChildren) != "undefined") && (newChildren != null)) {
            TreeView_ToggleNode(context.data, context.index, treeNode, context.lineType, newChildren);
            treeNode.href = document.getElementById ?
                "javascript:TreeView_ToggleNode(" + context.data.name + "," + context.index + ",document.getElementById('" + treeNode.id + "'),'" + context.lineType + "',document.getElementById('" + newChildren.id + "'))" :
                "javascript:TreeView_ToggleNode(" + context.data.name + "," + context.index + "," + treeNode.id + ",'" + context.lineType + "'," + newChildren.id + ")";
            if ((typeof(context.selectNode) != "undefined") && (context.selectNode != null) && context.selectNode.href &&
                (context.selectNode.href.indexOf("javascript:TreeView_PopulateNode", 0) == 0)) {
                context.selectNode.href = treeNode.href;
            }
            if ((typeof(context.selectImageNode) != "undefined") && (context.selectImageNode != null) && context.selectNode.href &&
                (context.selectImageNode.href.indexOf("javascript:TreeView_PopulateNode", 0) == 0)) {
                context.selectImageNode.href = treeNode.href;
            }
        }
        context.data.populateLog.value += context.index + ",";
    }
    else {
        var img = treeNode.childNodes ? treeNode.childNodes[0] : treeNode.children[0];
        if ((typeof(img) != "undefined") && (img != null)) {
            var lineType = context.lineType;
            if (lineType == "l") {
                img.src = context.data.images[13];
            }
            else if (lineType == "t") {
                img.src = context.data.images[10];
            }
            else if (lineType == "-") {
                img.src = context.data.images[16];
            }
            else {
                img.src = context.data.images[3];
            }
            var pe;
            if (__nonMSDOMBrowser) {
                pe = treeNode.parentNode;
                pe.insertBefore(img, treeNode);
                pe.removeChild(treeNode);
            }
            else {
                pe = treeNode.parentElement;
                treeNode.style.visibility="hidden";
                treeNode.style.display="none";
                pe.insertAdjacentElement("afterBegin", img);
            }
        }
    }
}