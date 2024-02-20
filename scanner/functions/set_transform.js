function set_transform(pos, dir, addZ, scaleZ, skew) {
    if (arguments.length === 0) { $error("set_transform() called with no arguments"); }
    if (is_object(pos) && (('pos' in pos) || ('dir' in pos) || ('z' in pos) || ('z_dir' in pos) || ('skew' in pos))) {
        // Argument version
        return set_transform(pos.pos, pos.dir, pos.z, pos.z_dir, pos.skew);
    }

    let addX, addY, scaleX, scaleY, skewXZ, skewYZ;
    if (pos !== undefined) {
        if (is_number(pos)) { $error("pos argument to set_transform() must be an xy() or nil"); }
        addX = pos.x; addY = pos.y;
    }
    if (dir !== undefined) { scaleX = dir.x; scaleY = dir.y; }
    if (skew !== undefined) { skewXZ = skew.x; skewYZ = skew.y; }

    // Any undefined fields will default to their previous values
    if (addX === undefined) { addX = $offsetX; }
    if (addY === undefined) { addY = $offsetY; }
    if (addZ === undefined) { addZ = $offsetZ; }
    if (scaleX === undefined) { scaleX = $scaleX; }
    if (scaleY === undefined) { scaleY = $scaleY; }
    if (scaleZ === undefined) { scaleZ = $scaleZ; }
    if (skewXZ === undefined) { skewXZ = $skewXZ; }
    if (skewYZ === undefined) { skewYZ = $skewYZ; }

    if (isNaN(addX) || isNaN(addY) || isNaN(addZ)) { $error('NaN in transform pos'); }
    if (isNaN(scaleX) || isNaN(scaleY) || isNaN(scaleZ)) { $error('NaN in transform scale'); }
    if (isNaN(skewXZ) || isNaN(skewYZ)) { $error('NaN in transform skew'); }
    
    $offsetX = addX;
    $offsetY = addY;
    $offsetZ = addZ;

    $scaleX = (scaleX === -1) ? -1 : +1;
    $scaleY = (scaleY === -1) ? -1 : +1;
    $scaleZ = (scaleZ === -1) ? -1 : +1;

    $skewXZ = skewXZ;
    $skewYZ = skewYZ;
}