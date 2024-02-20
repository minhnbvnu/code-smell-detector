function Menu_ResetTopMenus(table, doNotReset, level, up) {
    var i, child, childNode;
    if (up && table.id == "") {
        var parentTable = table.parentNode.parentNode.parentNode.parentNode;
        if (parentTable.tagName.toLowerCase() == "table") {
            Menu_ResetTopMenus(parentTable, doNotReset, level + 1, true);
        }
    }
    else {
        if (level == 0 && table != doNotReset) {
            if (table.rows[0].id) {
                for(i = 0; i < table.rows.length; i++) {
                    childNode = table.rows[i];
                    child = WebForm_GetElementById(childNode.id + "Items");
                    if (child) {
                        Menu_HideItems(child);
                    }
                }
            }
            else {
                for(i = 0; i < table.rows[0].cells.length; i++) {
                    childNode = table.rows[0].cells[i];
                    child = WebForm_GetElementById(childNode.id + "Items");
                    if (child) {
                        Menu_HideItems(child);
                    }
                }
            }
        }
        else if (level > 0) {
            for (i = 0; i < table.rows.length; i++) {
                for (var j = 0; j < table.rows[i].cells.length; j++) {
                    var subTable = table.rows[i].cells[j].firstChild;
                    if (subTable && subTable.tagName.toLowerCase() == "table") {
                        Menu_ResetTopMenus(subTable, doNotReset, level - 1, false);
                    }
                }
            }
        }
    }
}