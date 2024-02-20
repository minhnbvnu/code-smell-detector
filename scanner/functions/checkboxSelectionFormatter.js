function checkboxSelectionFormatter(row, cell, value, columnDef, dataContext, grid) {
            var UID = createUID() + row;
            if (dataContext) {
                if (!checkSelectableOverride(row, dataContext, grid)) {
                    return null;
                }
                else {
                    return _selectedRowsLookup[row]
                        ? "<input id='selector" + UID + "' type='checkbox' checked='checked'><label for='selector" + UID + "'></label>"
                        : "<input id='selector" + UID + "' type='checkbox'><label for='selector" + UID + "'></label>";
                }
            }
            return null;
        }