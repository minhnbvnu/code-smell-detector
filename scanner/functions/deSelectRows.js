function deSelectRows(rowArray) {
            var i, l = rowArray.length, removeRows = [];
            for (i = 0; i < l; i++) {
                if (_selectedRowsLookup[rowArray[i]]) {
                    removeRows[removeRows.length] = rowArray[i];
                }
            }
            _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
                return removeRows.indexOf(n) < 0;
            }));
        }