function toggleRowSelection(row) {
            var dataContext = _grid.getDataItem(row);
            if (!checkSelectableOverride(row, dataContext, _grid)) {
                return;
            }
            if (_selectedRowsLookup[row]) {
                _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
                    return n != row;
                }));
            }
            else {
                _grid.setSelectedRows(_grid.getSelectedRows().concat(row));
            }
            _grid.setActiveCell(row, getCheckboxColumnCellIndex());
        }