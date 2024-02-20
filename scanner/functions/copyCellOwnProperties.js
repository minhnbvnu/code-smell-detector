function copyCellOwnProperties(column) {
            var properties = behavior.getCellOwnProperties(column.index, rowIndex, dataModel);
            if (properties) {
                var subgrid = subgrids[key] = subgrids[key] || {},
                    row = subgrid[rowIndex] = subgrid[rowIndex] = {};
                row[column.name] = Object.assign({}, properties);
            }
        }