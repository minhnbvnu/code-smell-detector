function draw_rect(pos, size, fill, border, angle, z) {
    if (pos === undefined) {
        $error('draw_rect() called on nil');
    }
    
    if (pos.pos) {
        z = pos.z;
        angle = pos.angle;
        border = pos.outline;
        fill = pos.color;
        size = pos.size;
        pos = pos.pos;
    }

    if (typeof size !== 'object' || size.x === undefined || size.y === undefined) {
        $error("The size argument to draw_rect() must be an xy() or have x and y properties.");
    }
    
    angle = loop(angle || 0, -$Math.PI, $Math.PI);

    const rx = size.x * 0.5, ry = size.y * 0.5;
    if (($camera.angle === 0) && ($Math.min($Math.abs(angle), $Math.abs(angle - $Math.PI), $Math.abs(angle + $Math.PI)) < 1e-10)) {
        // Use the corner rect case for speed
        draw_corner_rect({x:pos.x - rx, y:pos.y - ry, z:pos.z}, size, fill, border, z);
    } else if (($camera.angle === 0) && ($Math.min($Math.abs(angle - $Math.PI * 0.5), $Math.abs(angle + $Math.PI * 0.5)) < 1e-10)) {
        // Use the corner rect case for speed, rotated 90 degrees
        draw_corner_rect({x:pos.x - ry, y:pos.y - rx, z:pos.z}, {x:size.y, y:size.x}, fill, border, z);
    } else {
        const vertexArray = [{x:-rx, y:-ry}, {x:rx, y:-ry}, {x:rx, y:ry}, {x:-rx, y:ry}];
        // Undo the camera angle transformation, since draw_poly will apply it again
        draw_poly(vertexArray, fill, border, pos, angle, undefined, z);
    }
}