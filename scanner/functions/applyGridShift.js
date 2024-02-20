function applyGridShift(source, inverse, point) {
        if (source.grids === null || source.grids.length === 0) {
            console.log('Grid shift grids not found');
            return -1;
        }
        var input = { x: -point.x, y: point.y };
        var output = { x: Number.NaN, y: Number.NaN };
        var onlyMandatoryGrids = false;
        var attemptedGrids = [];
        for (var i = 0; i < source.grids.length; i++) {
            var grid = source.grids[i];
            attemptedGrids.push(grid.name);
            if (grid.isNull) {
                output = input;
                break;
            }
            onlyMandatoryGrids = grid.mandatory;
            if (grid.grid === null) {
                if (grid.mandatory) {
                    console.log("Unable to find mandatory grid '" + grid.name + "'");
                    return -1;
                }
                continue;
            }
            var subgrid = grid.grid.subgrids[0];
            // skip tables that don't match our point at all
            var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 10000.0;
            var minX = subgrid.ll[0] - epsilon;
            var minY = subgrid.ll[1] - epsilon;
            var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
            var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
            if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x) {
                continue;
            }
            output = applySubgridShift(input, inverse, subgrid);
            if (!isNaN(output.x)) {
                break;
            }
        }
        if (isNaN(output.x)) {
            console.log("Failed to find a grid shift table for location '" +
                -input.x * values_1.R2D + " " + input.y * values_1.R2D + " tried: '" + attemptedGrids + "'");
            return -1;
        }
        point.x = -output.x;
        point.y = output.y;
        return 0;
    }