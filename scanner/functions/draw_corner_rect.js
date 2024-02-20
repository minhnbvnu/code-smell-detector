function draw_corner_rect(corner, size, fill, outline, z) {
    if ($skipGraphics) { return; }

    if (corner.corner) {
        if (size !== undefined) {
            $error('Named argument version of draw_corner_rect() must have only one argument');
        }
        size = corner.size;
        fill = corner.color;
        outline = corner.outline;
        z = corner.z;
        corner = corner.corner;
    }
    
    if ($Math.abs($camera.angle) >= 1e-10) {
        // Draw using a polygon because it is rotated
        draw_rect({x: corner.x + size.x * 0.5, y: corner.y + size.y * 0.5, z: corner.z}, size, fill, outline, 0, z);
        return;
    }

    if (z === undefined) { z = corner.z; }
    z = (z || 0) - $camera.z;
    let z_order = (corner.z === undefined) ? z : (corner.z - $camera.z);

    if (($camera.x !== 0) || ($camera.y !== 0)) {
        corner = {x: corner.x - $camera.x, y: corner.y - $camera.y};
    }

    if ($camera.zoom !== 1) {
        const m = $zoom(z);
        corner = {x: corner.x * m, y: corner.y * m};
        size = {x: size.x * m, y: size.y * m};
    }

    const skx = (z * $skewXZ), sky = (z * $skewYZ);
    let x1 = (corner.x + skx) * $scaleX + $offsetX, y1 = (corner.y + sky) * $scaleY + $offsetY;
    let x2 = (corner.x + size.x + skx) * $scaleX + $offsetX, y2 = (corner.y + size.y + sky) * $scaleY + $offsetY;
    z = z * $scaleZ + $offsetZ;
    z_order = z_order * $scaleZ + $offsetZ;

    fill = $colorToUint16(fill);
    outline = $colorToUint16(outline);

    // Sort coordinates
    let t1 = $Math.min(x1, x2), t2 = $Math.max(x1, x2);
    x1 = t1; x2 = t2;
    
    t1 = $Math.min(y1, y2), t2 = $Math.max(y1, y2);
    y1 = t1; y2 = t2;

    // Inclusive bounds for open top and left edges at the pixel center samples
    // low 0 -> 0, 0.5 -> 1
    // high 4 -> 3, 4.5 -> 4
    x1 = $Math.round(x1); y1 = $Math.round(y1);
    x2 = $Math.floor(x2 - 0.5); y2 = $Math.floor(y2 - 0.5);

    // Culling optimization
    if ((x2 < x1) || (y2 < y1) ||
        (x1 > $clipX2 + 0.5) || (x2 < $clipX1 - 0.5) || (z < $clipZ1 - 0.5) ||
        (y1 > $clipY2 + 0.5) || (y2 < $clipY1 - 0.5) || (z > $clipZ2 + 0.5)) {
        return;
    }

    const prevCommand = $graphicsCommandList[$graphicsCommandList.length - 1];
    if (prevCommand &&
        (prevCommand.baseZ === z_order) &&
        (prevCommand.opcode === 'REC') &&
        (prevCommand.clipX1 === $clipX1) && (prevCommand.clipX2 === $clipX2) &&
        (prevCommand.clipY1 === $clipY1) && (prevCommand.clipY2 === $clipY2)) {
        // Aggregate into the previous command
        prevCommand.data.push({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            fill: fill,
            outline: outline
        })
    } else {
        $addGraphicsCommand({
            z: z_order,
            baseZ: z_order,
            opcode: 'REC',
            data: [{
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                fill: fill,
                outline: outline
            }]
        });
    }
}