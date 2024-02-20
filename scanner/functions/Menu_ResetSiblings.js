function Menu_ResetSiblings(item) {
    var table = (item.tagName.toLowerCase() == "td") ?
        item.parentNode.parentNode.parentNode :
        item.parentNode.parentNode;
    var isVertical = false;
    for (var r = 0; r < table.rows.length; r++) {
        if (table.rows[r].id) {
            isVertical = true;
            break;
        }
    }
    var i, child, childNode;
    if (isVertical) {
        for(i = 0; i < table.rows.length; i++) {
            childNode = table.rows[i];
            if (childNode != item) {
                child = WebForm_GetElementById(childNode.id + "Items");
                if (child) {
                    Menu_HideItems(child);
                }
            }
        }
    }
    else {
        for(i = 0; i < table.rows[0].cells.length; i++) {
            childNode = table.rows[0].cells[i];
            if (childNode != item) {
                child = WebForm_GetElementById(childNode.id + "Items");
                if (child) {
                    Menu_HideItems(child);
                }
            }
        }
    }
    Menu_ResetTopMenus(table, table, 0, true);
}