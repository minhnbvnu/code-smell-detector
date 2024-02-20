function draw_line(A, B, color, z, width) {
    if ($skipGraphics) { return; }

    if (A.A) {
        width = A.width;
        z = A.z;
        color = A.color;
        B = A.B;
        A = A.A;
    }
    
    if (width === undefined) { width = 1; }

    let z_pos_A = A.z;
    let z_pos_B = B.z;
    let z_order = z;
    
    if (z_order === undefined) { z_order = z_pos_A; }
    if (z_order === undefined) { z_order = 0; }
    if (z_pos_A === undefined) { z_pos_A = z_order; }
    if (z_pos_B === undefined) { z_pos_B = z_order; }

    z_pos_A -= $camera.z;
    z_pos_B -= $camera.z;
    z_order -= $camera.z;

    const mag_A = $zoom(z_pos_A), mag_B = $zoom(z_pos_B);

    const zoomed_width = width * 0.5 * ($Math.abs(mag_A) + $Math.abs(mag_B));
    
    if ($Math.max($Math.abs(mag_A), $Math.abs(mag_B)) * width >= 1.5) {
        // Draw a polygon instead of a thin line, as this will
        // be more than one pixel wide in screen space. Do not
        // apply zooming as the polygon itself will do that.
        let delta_x = B.y - A.y, delta_y = A.x - B.x;
        let m = $Math.hypot(delta_x, delta_y);
        if (m < 0.001) { return; }
        m = width / (2 * m);
        delta_x *= m; delta_y *= m;
        draw_poly(
            [{x:A.x - delta_x * mag_A, y:A.y - delta_y * mag_A, z: A.z},
             {x:A.x + delta_x * mag_A, y:A.y + delta_y * mag_A, z: A.z},
             {x:B.x + delta_x * mag_B, y:B.y + delta_y * mag_B, z: B.z},
             {x:B.x - delta_x * mag_B, y:B.y - delta_y * mag_B, z: B.z}],
            color, undefined, undefined, undefined, undefined, z);
        return;
    }
    
    if (($camera.x !== 0) || ($camera.y !== 0) || ($camera.angle !== 0) || ($camera.zoom !== 1)) {
        // Transform the arguments to account for the camera
        const C = $Math.cos($camera.angle), S = $Math.sin($camera.angle * rotation_sign());
        let x = A.x - $camera.x, y = A.y - $camera.y;
        A = {x: (x * C + y * S) * mag_A, y: (y * C - x * S) * mag_A};
        
        x = B.x - $camera.x, y = B.y - $camera.y;
        B = {x: (x * C + y * S) * mag_B, y: (y * C - x * S) * mag_B};
        
        width = zoomed_width;
    }
    
    const x1 = (A.x + z_pos_A * $skewXZ) * $scaleX + $offsetX, y1 = (A.y + z_pos_A * $skewYZ) * $scaleY + $offsetY;
    const x2 = (B.x + z_pos_B * $skewXZ) * $scaleX + $offsetX, y2 = (B.y + z_pos_B * $skewYZ) * $scaleY + $offsetY;
    z_order = z_order * $scaleZ + $offsetZ;
    z_pos_A = z_pos_A * $scaleZ + $offsetZ;
    z_pos_B = z_pos_B * $scaleZ + $offsetZ;

    color = $colorToUint16(color);

    // Offscreen culling optimization
    if (! (color & 0xf000) ||
        ($Math.min(x1, x2) > $clipX2 + 0.5) || ($Math.max(x1, x2) < $clipX1 - 0.5) || ($Math.min(z_pos_A, z_pos_B) < $clipZ1 - 0.5) ||
        ($Math.min(y1, y2) > $clipY2 + 0.5) || ($Math.max(y1, y2) < $clipY1 - 0.5) || ($Math.max(z_pos_A, z_pos_B) > $clipZ2 + 0.5)) {
        return;
    }

    $addGraphicsCommand({
        opcode: 'LIN',
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2,
        z: z_order,
        color: color,
        open1: false,
        open2: false
    });
}