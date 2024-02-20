function $advanceRayGridIterator(it) {
    // Find the axis of the closest partition along the ray
    it.enterAxis = (it.exitDistance.x < it.exitDistance.y) ? 'x' : 'y';

    $console.assert(it.exitDistance[it.enterAxis] < Infinity);
    
    it.enterDistance               = it.exitDistance[it.enterAxis];
    it.index[it.enterAxis]        += it.step[it.enterAxis];
    it.exitDistance[it.enterAxis] += it.tDelta[it.enterAxis];
    
    // If the index just hit the boundary exit, we have
    // permanently exited the grid.
    it.insideGrid = it.insideGrid && (it.index[it.enterAxis] !== it.boundaryIndex[it.enterAxis]);
    
    it.containsRayOrigin = false;
}