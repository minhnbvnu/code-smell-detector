function setCellPropertiesByColumnNameAndRowIndex(cellsHash) { // to be called with grid.properties as context
    var subgrids = this.grid.behavior.subgrids,
        columns = this.grid.behavior.getColumns(),
        methodName = this.settingState ? 'setCellProperties' : 'addCellProperties';

    Object.keys(cellsHash).forEach(function(subgridName) {
        var subgrid = subgrids.lookup[subgridName];
        if (subgrid) {
            var subgridHash = cellsHash[subgridName];
            Object.keys(subgridHash).forEach(function(rowIndex) {
                var columnProps = subgridHash[rowIndex];
                Object.keys(columnProps).forEach(function(columnName) {
                    var properties = columnProps[columnName];
                    if (properties) {
                        var column = columns.find(function(column) {
                            return column.name === columnName;
                        });
                        if (column) {
                            column[methodName](rowIndex, properties, subgrid);
                        }
                    }
                });
            });
        }
    });
}