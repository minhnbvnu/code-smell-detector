function set_clip(corner, size, z1, dz) {
    if (corner && (corner.corner || corner.size || (corner.z !== undefined) || (corner.z_size !== undefined))) {
        return set_clip(corner.corner, corner.size, corner.z, corner.z_size);
    }
    
    let x1, y1, dx, dy;
    if (corner !== undefined) {
        if (is_number(corner)) { $error('corner argument to set_clip() must be an xy() or nil'); }
        x1 = corner.x; y1 = corner.y;
    }
    if (size !== undefined) {
        if (is_number(size)) { $error('size argument to set_clip() must be an xy() or nil'); }
        dx = size.x; dy = size.y;
    }
    
    if (x1 === undefined) { x1 = $clipX1; }
    if (y1 === undefined) { y1 = $clipY1; }
    if (z1 === undefined) { z1 = $clipZ1; }
    if (dx === undefined) { dx = $clipX2 - $clipX1 + 1; }
    if (dy === undefined) { dy = $clipY2 - $clipY1 + 1; }
    if (dz === undefined) { dz = $clipZ2 - $clipZ1 + 1; }

    let x2 = x1 + dx, y2 = y1 + dy, z2 = z1 + dz;

    // Order appropriately
    if (x2 < x1) { let temp = x1; x1 = x2; x2 = temp; }
    if (y2 < y1) { let temp = y1; y1 = y2; y2 = temp; }
    if (z2 < z1) { let temp = z1; z1 = z2; z2 = temp; }
    
    x1 = $Math.round(x1);
    y1 = $Math.round(y1);
    z1 = $Math.round(z1);

    x2 = $Math.floor(x2 - 0.5);
    y2 = $Math.floor(y2 - 0.5);
    z2 = $Math.floor(z2 - 0.5);

    $clipX1 = $clamp(x1, 0, $SCREEN_WIDTH - 1);
    $clipY1 = $clamp(y1, 0, $SCREEN_HEIGHT - 1);
    $clipZ1 = $clamp(z1, -2047, 2048);
    
    $clipX2 = $clamp(x2, 0, $SCREEN_WIDTH - 1);
    $clipY2 = $clamp(y2, 0, $SCREEN_HEIGHT - 1);
    $clipZ2 = $clamp(z2, -2047, 2048);
}