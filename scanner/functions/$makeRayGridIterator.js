function $makeRayGridIterator(rayPos, rayDir, rayLength, numCells, cellSize) {

    const it = {
        numCells:          numCells,
        enterDistance:     0,

        // Will be set to 'x' or 'y' by advancing the iterator
        enterAxis:         '',
        
        ray:               {pos: {x: rayPos.x, y: rayPos.y},
                            dir: {x: rayDir.x, y: rayDir.y},
                            length: rayLength},
        
        cellSize:          cellSize,

        // Is the iterator's current point still inside the grid
        insideGrid:        true,

        // Does the current cell contain the ray origin (if not
        // then it is on an edge)
        containsRayOrigin: true,
        index:             {x:0, y:0},
        tDelta:            {x:0, y:0},
        step:              {x:0, y:0},
        exitDistance:      {x:0, y:0},
        boundaryIndex:     {x:0, y:0}
    };

    //////////////////////////////////////////////////////////////////////
    // See if the ray begins inside the grid

    let startsOutside = false;
    let startLocation = {x: it.ray.pos.x, y: it.ray.pos.y};
    let inside = startLocation.x >= 0 && startLocation.x < numCells.y * cellSize.x &&
        startLocation.y >= 0 && startLocation.y < numCells.y * cellSize.y;
    
    ///////////////////////////////

    if (! inside) {
        // The ray is starting outside of the grid. See if it ever
        // intersects the grid.
        
        // From Listing 1 of "A Ray-Box Intersection Algorithm and Efficient Dynamic Voxel Rendering", jcgt 2018
        const t0 = {x: -it.ray.pos.x / it.ray.dir.x,
                    y: -it.ray.pos.y / it.ray.dir.y};
        const t1 = {x: (numCells.x * cellSize.x - it.ray.pos.x) / it.ray.dir.x,
                    y: (numCells.y * cellSize.y - it.ray.pos.y) / it.ray.dir.y};
        const tmin = {x: $Math.min(t0.x, t1.x),
                      y: $Math.min(t0.y, t1.y)};
        const tmax = {x: $Math.max(t0.x, t1.x),
                      y: $Math.max(t0.y, t1.y)};
        
        const passesThroughGrid = $Math.max(tmin.x, tmin.y) <= $Math.min(tmax.x, tmax.y);
        
        if (passesThroughGrid) {
            // Back up slightly so that we immediately hit the start location
            it.enterDistance = $Math.hypot(it.ray.pos.x - startLocation.x,
                                           it.ray.pos.y - startLocation.y) - 0.00001;
            startLocation = {x: it.ray.pos.x + it.ray.dir.x * it.enterDistance,
                             y: it.ray.pos.y + it.ray.dir.y * it.enterDistance};
            startsOutside = true;
        } else {
            // The ray never hits the grid
            it.insideGrid = false;
        }
    }

    //////////////////////////////////////////////////////////////////////
    // Find the per-iteration variables
    const axisArray = 'xy';
        
    for (let i = 0; i < 2; ++i) {
        const a = axisArray[i];
        
        it.index[a]  = $Math.floor(startLocation[a] / cellSize[a]);
        it.tDelta[a] = $Math.abs(cellSize[a] / it.ray.dir[a]);
        it.step[a]   = $Math.sign(it.ray.dir[a]);

        // Distance to the edge of the cell along the ray direction
        let d = startLocation[a] - it.index[a] * cellSize[a];
        if (it.step[a] > 0) {
            // Measure from the other edge
            d = cellSize[a] - d;

            // Exit on the high side
            it.boundaryIndex[a] = it.numCells[a];
        } else {
            // Exit on the low side (or never)
            it.boundaryIndex[a] = -1;
        }
        $console.assert(d >= 0 && d <= cellSize[a]);

        if (it.ray.dir[a] !== 0) {
            it.exitDistance[a] = d / $Math.abs(it.ray.dir[a]) + it.enterDistance;
        } else {
            // Ray is parallel to this partition axis.
            // Avoid dividing by zero, which could be NaN if d === 0
            it.exitDistance[a] = Infinity;
        }
    }

    if (startsOutside) {
        // Let the increment operator bring us into the first cell
        // so that the starting axis is initialized correctly.
        $advanceRayGridIterator(it);
    }

    return it;
}