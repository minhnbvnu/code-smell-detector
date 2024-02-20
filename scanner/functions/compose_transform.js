function compose_transform(pos, dir, addZ, scaleZ, skew) {
    if (is_object(pos) && (('pos' in pos) || ('dir' in pos) || ('z' in pos) || ('skew' in pos))) {
        // Argument version
        return compose_transform(pos.pos, pos.dir, pos.z, pos.skew);
    }
    let addX, addY, scaleX, scaleY, skewXZ, skewYZ;
    if (pos !== undefined) {
        if (is_number(pos)) { $error("pos argument to compose_transform() must be an xy() or nil"); }
        addX = pos.x; addY = pos.y;
    }
    if (dir !== undefined) { scaleX = dir.x; scaleY = dir.y; }
    if (skew !== undefined) { skewXZ = skew.x; skewYZ = skew.y; }

    // Any undefined fields will default to the reset values
    if (addX === undefined) { addX = 0; }
    if (addY === undefined) { addY = 0; }
    if (addZ === undefined) { addZ = 0; }
    if (scaleX === undefined) { scaleX = 1; }
    if (scaleY === undefined) { scaleY = 1; }
    if (scaleZ === undefined) { scaleZ = 1; }
    if (skewXZ === undefined) { skewXZ = 0; }
    if (skewYZ === undefined) { skewYZ = 0; }

    // Composition derivation under the "new transformation happens first" model:
    //
    // Basic transforms:
    // screen.x = (draw.x + skew.x * draw.z) * dir.x + pos.x
    // screen.y = (draw.y + skew.y * draw.z) * dir.y + pos.y
    // screen.z = draw.z * zDir + z
    //
    // screen.z = (draw.z * zDirNew + addZNew) * zDirOld + addZOld
    //          = draw.z * zDirNew * zDirOld + addZNew * zDirOld + addZOld
    //          = draw.z * (zDirNew * zDirOld) + (addZNew * zDirOld + addZOld)
    //   zAddNet = addZNew * zDirOld + addZOld
    //   zDirNet = zDirNew * zDirOld
    //
    // screen.x = (((draw.x + skewNew.x * draw.z) * dirNew.x + posNew.x) + skew.x * draw.z) * dir.x + pos.x
    //          = (draw.x * dirNew.x + skewNew.x * draw.z * dirNew.x + skew.x * draw.z) * dir.x + posNew.x * dir.x + pos.x
    //          = (draw.x + draw.z * [skewNew.x + skew.x/dirNew.x]) * [dir.x * dirNew.x] + posNew.x * dir.x + pos.x
    //     netAdd.x = posNew.x * dir.x + pos.x
    //     netSkew.x = skewNew.x + skew.x / dirNew.x
    //     netDir.x = dir.x * dirNew.x
    

    // Order matters because these calls mutate the parameters.
    $offsetX = addX * $scaleX + $offsetX;
    $skewXZ  = skewXZ + $skewXZ / $scaleX;
    $scaleX  = scaleX * $scaleX;

    $offsetY = addY * $scaleY + $offsetY;
    $skewYZ  = skewYZ + $skewYZ / $scaleY;
    $scaleY  = scaleY * $scaleY;
    
    $offsetZ = addZ * $scaleZ + $offsetZ;
    $scaleZ  = scaleZ * $scaleZ;    
}