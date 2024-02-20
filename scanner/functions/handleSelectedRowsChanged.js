function handleSelectedRowsChanged(e, args) {
            var selectedRows = _grid.getSelectedRows();
            var lookup = {}, row, i, k;
            var disabledCount = 0;
            if (typeof _selectableOverride === 'function') {
                for (k = 0; k < _grid.getDataLength(); k++) {
                    // If we are allowed to select the row
                    var dataItem = _grid.getDataItem(k);
                    if (!checkSelectableOverride(i, dataItem, _grid)) {
                        disabledCount++;
                    }
                }
            }
            var removeList = [];
            for (i = 0; i < selectedRows.length; i++) {
                row = selectedRows[i];
                // If we are allowed to select the row
                var rowItem = _grid.getDataItem(row);
                if (checkSelectableOverride(i, rowItem, _grid)) {
                    lookup[row] = true;
                    if (lookup[row] !== _selectedRowsLookup[row]) {
                        _grid.invalidateRow(row);
                        delete _selectedRowsLookup[row];
                    }
                }
                else {
                    removeList.push(row);
                }
            }
            for (i in _selectedRowsLookup) {
                _grid.invalidateRow(i);
            }
            _selectedRowsLookup = lookup;
            _grid.render();
            _isSelectAllChecked = selectedRows.length && selectedRows.length + disabledCount >= _grid.getDataLength();
            if (!_options.hideInColumnTitleRow && !_options.hideSelectAllCheckbox) {
                renderSelectAllCheckbox(_isSelectAllChecked);
            }
            if (!_options.hideInFilterHeaderRow) {
                var selectAllElm = $("#header-filter-selector" + _selectAll_UID);
                selectAllElm.prop("checked", _isSelectAllChecked);
            }
            // Remove items that shouln't of been selected in the first place (Got here Ctrl + click)
            if (removeList.length > 0) {
                for (i = 0; i < removeList.length; i++) {
                    var remIdx = selectedRows.indexOf(removeList[i]);
                    selectedRows.splice(remIdx, 1);
                }
                _grid.setSelectedRows(selectedRows);
            }
        }