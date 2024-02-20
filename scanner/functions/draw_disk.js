function draw_disk(pos, radius, color, outline, z) {
    if ($skipGraphics) { return; }

    if (pos.pos) {
        // Object version
        outline = pos.outline;
        color = pos.color;
        radius = pos.radius;
        z = pos.z;
        pos = pos.pos;
    }

    if (radius === undefined) {
        $error('draw_disk() requires a non-nil radius')
    }

    let z_order = z;
    if (z_order === undefined) { z_order = pos.z; }
    if (z_order === undefined) { z_order = 0; }
    let z_pos = pos.z;
    if (z_pos === undefined) { z_pos = z_order; }

    z_order -= $camera.z;
    z_pos -= $camera.z;
    
    if (($camera.x !== 0) || ($camera.y !== 0) || ($camera.angle !== 0) || ($camera.zoom !== 1)) {
        // Transform the arguments to account for the camera
        const mag = $zoom(z_pos);
        const C = $Math.cos($camera.angle) * mag, S = $Math.sin($camera.angle * rotation_sign()) * mag;
        const x = pos.x - $camera.x, y = pos.y - $camera.y;
        pos = {x: x * C + y * S, y: y * C - x * S};
        radius *= mag;
    }
    
    const skx = (z_pos * $skewXZ), sky = (z_pos * $skewYZ);
    let x = (pos.x + skx) * $scaleX + $offsetX, y = (pos.y + sky) * $scaleY + $offsetY;
    z_pos = z_pos * $scaleZ + $offsetZ;
    z_order = z_order * $scaleZ + $offsetZ;

    // Culling optimization
    if ((x - radius > $clipX2 + 0.5) || (y - radius > $clipY2 + 0.5) || (z_pos > $clipZ2 + 0.5) ||
        (x + radius < $clipX1 - 0.5) || (y + radius < $clipY1 - 0.5) || (z_pos < $clipZ1 - 0.5)) {
        return;
    }

    color   = $colorToUint16(color);
    outline = $colorToUint16(outline);

    $addGraphicsCommand({
        opcode: 'CIR',
        x: x,
        y: y,
        z: z_order,
        radius: radius,
        color: color,
        outline: outline
    });
}