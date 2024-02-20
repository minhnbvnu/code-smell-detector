function checkSelectableOverride(row, dataContext, grid) {
            if (typeof _selectableOverride === 'function') {
                return _selectableOverride(row, dataContext, grid);
            }
            return true;
        }