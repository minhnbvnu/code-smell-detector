function xyz(x, y, z) {
    if (x.x !== undefined) {
        if (x.z !== undefined) { 
            if (x.y === undefined) { // xyz(xz)
                return {x:x.x, y:(y === undefined ? 0 : y), z:x.z};
            } else { // xyz(xyz) {
                if (y !== undefined) { $error('Cannot run xyz(xyz, z)'); }
                return {x:x.x, y:x.y, z:x.z};
            }
        } else { // xyz(xy, y default 0)
            return {x:x.x, y:x.y, z:(y === undefined ? 0 : y)}
        }
    }
    if (Array.isArray(x)) { return {x:x[0], y:x[1], z:x[2]}; }
    if (arguments.length !== 3) { $error('xyz() requires exactly three arguments'); }
    return {x:x, y:y, z:z};
}