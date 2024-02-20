function setRowPropertiesBySubgridAndRowIndex(rowsHash) { // to be called with grid.properties as context
    var behavior = this.grid.behavior,
        methodName = this.settingState ? 'setRowProperties' : 'addRowProperties';

    Object.keys(rowsHash).forEach(function(subgridName) {
        var subgrid = behavior.subgrids.lookup[subgridName];
        if (subgrid) {
            var subgridHash = rowsHash[subgridName];
            Object.keys(subgridHash).forEach(function(rowIndex) {
                var properties = subgridHash[rowIndex];
                behavior[methodName](rowIndex, properties, subgrid);
            });
        }
    });
}