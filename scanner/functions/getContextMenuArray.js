function getContextMenuArray(table, isDisableAddObjects, addObjectsCallback)
{
    return {
        callback: function (key, options) {
            if (key === 'add_object') {
                if(addObjectsCallback) {
                    addObjectsCallback(table, table.handsontable('getSelected'));
                }
            }
            else if (key === 'duplicate_rows_local') {

            }
            else if (key === 'fill_all') {
                var row = table.handsontable('getSelected')[0];
                var col = table.handsontable('getSelected')[1];
                var colHeader = table.handsontable('getColHeader', col);
                var value = table.handsontable('getDataAtCell', row, col);

                setColumnValue(table, colHeader, value);
            }
            else if (key === 'fill_down') {
                var row = table.handsontable('getSelected')[0];
                var col = table.handsontable('getSelected')[1];
                var colHeader = table.handsontable('getColHeader', col);
                var value = table.handsontable('getDataAtCell', row, col);

                setColumnValue(table, colHeader, value, row);
            }
            else if (key === 'remove_duplicates') {

            }
            else if (key === 'remove_errors_all') {
                removeRowsErrorsAll(table);
            }
            else if (key === 'remove_errors_col') {
                removeRowsSelectedCol(table);
            }
            else if (key === 'set_height') {
                var newHeight = prompt("Enter the new height, in pixels", table.handsontable('getSettings').height);

                if (newHeight !== null) {
                    newHeight = parseInt(newHeight);

                    if (isNan(newHeight) === false) {
                        if (newHeight > 0 && newHeight < 100) {
                            newHeight = 100;
                        } else if (newHeight < 0) {
                            newHeight = 0;
                        }

                        updateSetting(table, 'height', newHeight);
                    }
                }
            }
        },
        items: {
            "row_above": {},
            "row_below": {},
            "hsep1": "---------",
            "remove_row": {
                name: 'Remove selected rows'
            },
            "hsep2": "---------",
            "fill_all": {
                name: "Fill Entire Column With Selected Cell",
                disabled: function() {
                    return (table.handsontable('getSelected')[0] !== table.handsontable('getSelected')[2]
                            || table.handsontable('getSelected')[1] !== table.handsontable('getSelected')[3]);
                }
            },
            "fill_down": {
                name: "Fill Down Column With Selected Cell",
                disabled: function() {
                    return (table.handsontable('getSelected')[0] !== table.handsontable('getSelected')[2]
                            || table.handsontable('getSelected')[1] !== table.handsontable('getSelected')[3]);
                }
            },
            "hsep3": "---------",
            "add_object": {
                name: "Add Objects For Selected Rows",
                disabled: function() {
                    return isDisableAddObjects;
                }
            },
            "hsep4": "---------",
            "set_height": {
                name: "Set Maximum Table Height"
            }
        }
    };
}