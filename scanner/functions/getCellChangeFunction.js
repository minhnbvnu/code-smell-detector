function getCellChangeFunction(handsOnTableID, tableName, enable_navigation_control) {
    return function cellChange(changedCells, source) {
        if (!changedCells || source === "ignore") {
            return;
        }

        var table = $('#' + handsOnTableID);

        $.each(changedCells, function (index, changedCell) {
            var row = changedCell[0];
            var col = changedCell[1];
            var oldCellValue = changedCell[2];
            var newCellValue = changedCell[3];
            var cellMeta = table.handsontable("getCellMeta", row, col);

            var columnName = table.handsontable('getColHeader', col);

            addClass(cellMeta, "modified");

            // Special processing for "Object Type" columns
            if(oldCellValue !== newCellValue) {
                if(typeof columnName !== 'undefined' && columnName.indexOf("Object Type") !== -1) {
                    processObjectTypeCellChange(table, row, newCellValue);
                }
            }

            if(cellMeta.classes.indexOf("htInvalid") !== -1 ||
                    cellMeta.classes.indexOf("htDuplicate") !== -1) {
                removeClass(cellMeta, "htInvalid");
                addClass(cellMeta, "htPending");
            }
        });

        if(tableName === defaultTableName) {
            $("#update-" + tableName + "-table").button({disabled: true});
            $("#validate-" + tableName + "-table").button({disabled: false});
        } else {
            $("#update-" + tableName + "-inline-table").button({disabled: false});
            $("#validate-" + tableName + "-inline-table").button({disabled: false});
        }

        if(enable_navigation_control !== false && window.onbeforeunload === null) {
            window.onbeforeunload =
                function() {
                    if(table.handsontable("countRows") !== table.handsontable("countEmptyRows")) {
                        return "You have modifications.";
                }
            };
        }

        table.handsontable('render');
    };
}