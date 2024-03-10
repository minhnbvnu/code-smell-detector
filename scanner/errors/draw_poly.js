function draw_poly(vertexArray, fill, border, pos, angle, scale, z) {
    if ($skipGraphics) { return; }
    
    if (vertexArray.vertex_array) {
        z = vertexArray.z;
        scale = vertexArray.scale;
        angle = vertexArray.angle;
        pos = vertexArray.pos;
        border = vertexArray.outline;
        fill = vertexArray.color;
        vertexArray = vertexArray.vertex_array;
    }

    angle = (angle || 0) * rotation_sign();
    let Rx = $Math.cos(angle), Ry = $Math.sin(-angle);

    // Compute a per-vertex z value and average z-order
    const z_array = [];
    let z_order = 0;
    for (let i = 0; i < vertexArray.length; ++i) {
        let temp = vertexArray[i].z;
        if (temp === undefined) { temp = z || 0; }
        z_array[i] = temp;
        z_order += temp;
    }

    if (z !== undefined) {
        z_order = z;
    } else {
        z_order /= vertexArray.length;
    }
    
    // Clean up transformation arguments
    let Sx = 1, Sy = 1;

    if (scale !== undefined) {
        if (typeof scale === 'object') {
            Sx = scale.x; Sy = scale.y;
        } else {
            Sx = Sy = scale;
        }
    }

    let Tx = 0, Ty = 0, pos_z;
    if (pos) { Tx = pos.x; Ty = pos.y; pos_z = pos.z}

    switch (vertexArray.length) {
    case 0: return;
        
    case 1:
        {
            let p = vertexArray[0];
            if (pos) {
                if (p.z !== undefined) {
                    p = {x: Tx + p.x, y: Ty + p.y, z: (pos_z || 0) + p.z};
                } else {
                    p = {x: Tx + p.x, y: Ty + p.y};
                    if (pos_z !== undefined) {
                        p.z = pos_z;
                    }
                }
            }
            
            if (border) {
                draw_point(p, border, z);
            } else if (fill) {
                draw_point(p, fill, z);
            }
        }
        return;
        
    case 2:
        {
            let p = vertexArray[0];
            let q = vertexArray[1];
            if (pos || angle || (scale && scale !== 1)) {
                p = {x: Tx + p.x * Sx * Rx + p.y * Sy * Ry,
                     y: Ty + p.y * Sy * Rx - p.x * Sx * Ry,
                     z: (pos_z === undefined ? p.z : pos_z + (p.z || 0))};
                q = {x: Tx + q.x * Sx * Rx + q.y * Sy * Ry,
                     y: Ty + q.y * Sy * Rx - q.x * Sx * Ry,
                     z: (pos_z === undefined ? q.z : pos_z + (q.z || 0))};
            }

            if (border) {
                draw_line(p, q, border, z);
            } else if (fill) {
                draw_line(p, q, fill, z);
            }
        }
        return;
    }

    {
        const delta = (pos_z !== undefined) ? (pos_z - $camera.z) : $camera.z;
        z_order += delta;
        for (let i = 0; i < z_array.length; ++i) {
            z_array[i] += delta;
        }
    }
    
    // TODO: 3D
    if (($camera.x !== 0) || ($camera.y !== 0) || ($camera.angle !== 0)) {
        // Transform the arguments to account for the camera
        const C = $Math.cos($camera.angle),
              S = $Math.sin($camera.angle * rotation_sign());
        
        let x = Tx - $camera.x, y = Ty - $camera.y;
        Tx = x * C + y * S; Ty = y * C - x * S;
        angle -= $camera.angle * rotation_sign();

        // Update matrix
        Rx = $Math.cos(angle); Ry = $Math.sin(-angle);
    }
    // Preallocate the output array
    const N = vertexArray.length;
    const points = []; points.length = N * 2;

    // Compute the net transformation
    let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    for (let v = 0, p = 0; v < N; ++v, p += 2) {
        const vertex = vertexArray[v];
        const z = z_array[v];
        const mag = $zoom(z);        
        const skx = z * $skewXZ, sky = z * $skewYZ;
        
        // The object-to-draw and draw-to-screen transformations
        // could be concatenated to slightly reduce the amount of
        // math here, although it is maybe clearer and easier to debug
        // this way.
        
        // Object scale
        const Ax = vertex.x * Sx * mag,    Ay = vertex.y * Sy * mag;

        // Object rotate
        const Bx = Ax * Rx + Ay * Ry,      By = Ay * Rx - Ax * Ry;

        const Px = (Bx + Tx * mag + skx) * $scaleX + $offsetX;
        const Py = (By + Ty * mag + sky) * $scaleY + $offsetY;

        // Update bounding box
        minx = (Px < minx) ? Px : minx;    miny = (Py < miny) ? Py : miny;
        maxx = (Px > maxx) ? Px : maxx;    maxy = (Py > maxy) ? Py : maxy;
        
        points[p]     = Px;                points[p + 1] = Py;
    }

    // For clipping
    z_order = z_order * $scaleZ + $offsetZ;
    
    fill   = $colorToUint16(fill);
    border = $colorToUint16(border);

    // Culling/all transparent optimization
    if ((minx > $clipX2 + 0.5) || (miny > $clipY2 + 0.5) || (z_order < $clipZ1 - 0.5) ||
        (maxx < $clipX1 - 0.5) || (maxy < $clipY1 - 0.5) || (z_order > $clipZ2 + 0.5) ||
        !((fill | border) & 0xf000)) {
        return;
    }

    $addGraphicsCommand({
        opcode: 'PLY',
        points: points,
        z: z_order,
        color: fill,
        outline: border
    });
}