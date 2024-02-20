function draw_point(pos, color, z) {
    if ($skipGraphics) { return; }
    
    if (pos.pos) {
        // Named argument version
        z = pos.z;
        color = pos.color;
        pos = pos.pos;
    }

    color = $colorToUint16(color);

    // Completely transparent, nothing to render!
    if (color & 0xF000 === 0) { return; }

    if (z === undefined) {
        z = pos.z;
        if (z === undefined) {
            z = 0;
        }
    }
    z -= $camera.z;
    let z_order = (pos.z === undefined) ? z : (pos.z - $camera.z);

    if (($camera.x !== 0) || ($camera.y !== 0) || ($camera.angle !== 0) || ($camera.zoom !== 1)) {
        // Transform the arguments to account for the camera
        const mag = (typeof $camera.zoom === 'number') ? $camera.zoom : $camera.zoom(z);
        const C = $Math.cos($camera.angle) * mag, S = $Math.sin($camera.angle * rotation_sign()) * mag;
        const x = pos.x - $camera.x, y = pos.y - $camera.y;
        pos = {x: x * C + y * S, y: y * C - x * S};
    }
    
    const skx = z * $skewXZ, sky = z * $skewYZ;
    let x = (pos.x + skx) * $scaleX + $offsetX, y = (pos.y + sky) * $scaleY + $offsetY;
    z = z * $scaleZ + $offsetZ;
    z_order = z_order * $scaleZ + $offsetZ;
    
    x = $Math.floor(x) >>> 0; y = $Math.floor(y) >>> 0;
    
    if ((z < $clipZ1 - 0.5) || (z >= $clipZ2 + 0.5) ||
        (x < $clipX1) || (x > $clipX2) ||
        (y < $clipY1) || (y > $clipY2)) {
        return;
    }

    const prevCommand = $graphicsCommandList[$graphicsCommandList.length - 1];
    if (prevCommand && (prevCommand.baseZ === z_order) && (prevCommand.opcode === 'PIX')) {
        // Many points with the same z value are often drawn right
        // after each other.  Aggregate these (preserving their
        // ordering) for faster sorting and rendering.
        prevCommand.data.push((x + y * ($SCREEN_WIDTH >>> 0)) >>> 0, color); 
    } else {
        $addGraphicsCommand({
            z: z_order,
            baseZ: z_order,
            opcode: 'PIX',
            data: [(x + y * ($SCREEN_WIDTH >>> 0)) >>> 0, color]
        });
    }
}