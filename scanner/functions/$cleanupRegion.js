function $cleanupRegion(A) {
    if ((A.scale === undefined) || (A.pos === undefined) || (A.shape === undefined) || (A.size === undefined)) {
        if ((A.x !== undefined) && (A.y !== undefined)) {
            // This is a point. Default to disk because it makes
            // collision tests simpler.
            A = {pos:A, shape: 'disk'};
        }
        
        // Make a new object with default properties
        A = Object.assign({scale: xy(1, 1), size: xy(0, 0), angle: 0, shape: 'rect'}, A);

        if (A.corner && ! A.pos) {
            A.pos = {x: A.corner.x + 0.5 * A.size.x * $Math.abs(A.scale.x),
                     y: A.corner.y + 0.5 * A.size.y * $Math.abs(A.scale.y)}
            
            if (A.angle !== 0) {
                $error('Cannot use non-zero angle with a corner rect');
            }

            // Remove the corner property, which was a clone, to
            // avoid the upcoming check for both clone and pos.
            delete A.corner;
        }
    }

    if (A.corner) {
        $error('Cannot use both corner and pos on the same object');
    }

    if (! A.pos) {
        A.pos = {x: 0, y: 0};
    }
    
    if (A.pivot && (A.pivot.x !== 0 || A.pivot.y !== 0)) {
        // Apply the pivot, cloning the entire object for simplicity
        A = Object.assign({}, A);
        A.pos = $maybeApplyPivot(A.pos, A.pivot, A.angle, A.scale);
        delete A.pivot;
    }
    
    // All required properties are present
    return A;
}