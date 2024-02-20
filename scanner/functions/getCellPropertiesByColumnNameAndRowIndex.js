function getCellPropertiesByColumnNameAndRowIndex() {
    var behavior = this.grid.behavior,
        columns = behavior.getColumns(),
        subgrids = {};

    behavior.subgrids.forEach(function(dataModel) {
        var key = dataModel.name || dataModel.type;

        for (var rowIndex = 0, rowCount = dataModel.getRowCount(); rowIndex < rowCount; ++rowIndex) {
            columns.forEach(copyCellOwnProperties);
        }

        function copyCellOwnProperties(column) {
            var properties = behavior.getCellOwnProperties(column.index, rowIndex, dataModel);
            if (properties) {
                var subgrid = subgrids[key] = subgrids[key] || {},
                    row = subgrid[rowIndex] = subgrid[rowIndex] = {};
                row[column.name] = Object.assign({}, properties);
            }
        }
    });

    return subgrids;
}