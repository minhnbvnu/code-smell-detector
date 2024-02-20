function getRowPropertiesBySubgridAndRowIndex() { // to be called with grid.properties as context
    var subgrids = {};
    var behavior = this.grid.behavior;
    var defaultRowHeight = this.grid.properties.defaultRowHeight;
    behavior.subgrids.forEach(function(dataModel) {
        var key = dataModel.name || dataModel.type;
        for (var rowIndex = 0, rowCount = dataModel.getRowCount(); rowIndex < rowCount; ++rowIndex) {
            var rowProps = behavior.getRowProperties(rowIndex, undefined, dataModel);
            if (rowProps) {
                // create height mixin by invoking `height` getter
                var height = { height: rowProps.height };
                if (height.height === defaultRowHeight) {
                    height = undefined;
                }

                // clone it and mix in height
                rowProps = Object.assign({}, rowProps, height);

                // only include if at least one defined prop
                if (Object.getOwnPropertyNames(rowProps).find(definedProp)) {
                    var subgrid = subgrids[key] || (subgrids[key] = {});
                    subgrid[rowIndex] = rowProps;
                }
            }
        }
        function definedProp(key) { return rowProps[key] !== undefined; }
    });
    return subgrids;
}