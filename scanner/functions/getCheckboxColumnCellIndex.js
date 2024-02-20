function getCheckboxColumnCellIndex() {
            if (_checkboxColumnCellIndex === null) {
                _checkboxColumnCellIndex = 0;
                var colArr = _grid.getColumns();
                for (var i = 0; i < colArr.length; i++) {
                    if (colArr[i].id == _options.columnId) {
                        _checkboxColumnCellIndex = i;
                    }
                }
            }
            return _checkboxColumnCellIndex;
        }