function selectRows(rowArray) {
            var i, l = rowArray.length, addRows = [];
            for (i = 0; i < l; i++) {
                if (!_selectedRowsLookup[rowArray[i]]) {
                    addRows[addRows.length] = rowArray[i];
                }
            }
            _grid.setSelectedRows(_grid.getSelectedRows().concat(addRows));
        }