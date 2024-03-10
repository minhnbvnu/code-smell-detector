function Menu_HideItems(items) {
    if (document.body.__oldOnClick) {
        document.body.onclick = document.body.__oldOnClick;
        document.body.__oldOnClick = null;
    }
    Menu_ClearInterval();
    if (!items || ((typeof(items.tagName) == "undefined") && (items instanceof Event))) {
        items = __rootMenuItem;
    }
    var table = items;
    if ((typeof(table) == "undefined") || (table == null) || !table.tagName || (table.tagName.toLowerCase() != "table")) {
        table = WebForm_GetElementByTagName(table, "TABLE");
    }
    if ((typeof(table) == "undefined") || (table == null) || !table.tagName || (table.tagName.toLowerCase() != "table")) {
        return;
    }
    var rows = table.rows ? table.rows : table.firstChild.rows;
    var isVertical = false;
    for (var r = 0; r < rows.length; r++) {
        if (rows[r].id) {
            isVertical = true;
            break;
        }
    }
    var i, child, nextLevel;
    if (isVertical) {
        for(i = 0; i < rows.length; i++) {
            if (rows[i].id) {
                child = WebForm_GetElementById(rows[i].id + "Items");
                if (child) {
                    Menu_HideItems(child);
                }
            }
            else if (rows[i].cells[0]) {
                nextLevel = WebForm_GetElementByTagName(rows[i].cells[0], "TABLE");
                if (nextLevel) {
                    Menu_HideItems(nextLevel);
                }
            }
        }
    }
    else if (rows[0]) {
        for(i = 0; i < rows[0].cells.length; i++) {
            if (rows[0].cells[i].id) {
                child = WebForm_GetElementById(rows[0].cells[i].id + "Items");
                if (child) {
                    Menu_HideItems(child);
                }
            }
            else {
                nextLevel = WebForm_GetElementByTagName(rows[0].cells[i], "TABLE");
                if (nextLevel) {
                    Menu_HideItems(rows[0].cells[i].firstChild);
                }
            }
        }
    }
    if (items && items.id) {
        PopOut_Hide(items.id);
    }
}