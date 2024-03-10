function draw_map_span(start, size, map, map_coord0, map_coord1, min_layer, max_layer_exclusive, replacement_array, z, override_color, override_blend, invert_sprite_y, quality) {
    if (size === undefined && 'x' in start && 'y' in start) {
        return draw_map_span(start.start, start.size, start.map,
                             start.map_coord0, start.map_coord1, start.min_layer, start.max_layer_exclusive,
                             start.replacement_array, start.z, start.override_color, start.override_blend,
                             start.invert_sprite_y, start.quality);
    }
    
    if ($skipGraphics) { return; }

    if (quality === undefined) { quality = 1.0; }

    // TODO: Remove when height spans are permitted
    if (size.y > 1) {
        $error('draw_map_span() size must be 1 or 0 along the y axis');
    }

    if (size.x > 1 && size.y > 1) {
        $error('draw_map_span() size must be zero or 1 along at most one dimension');
    }
    if (size.x < 0 || size.y < 0) {
        $error('draw_map_span() size must be nonnegative');
    }
    
    override_blend = override_blend || "lerp";

    if (min_layer === undefined) {
        min_layer = 0;
    }

    if (max_layer_exclusive === undefined) {
        max_layer_exclusive = map.layer.length >>> 0;
    }

    min_layer = $Math.ceil(min_layer) >>> 0;
    max_layer_exclusive = max_layer_exclusive >>> 0;

    if ((max_layer_exclusive <= 0) || (min_layer >= map.layer.length)) {
        // Nothing to do
        return;
    }

    let z_order = z, z_pos = start.z;
    if (z_order === undefined) { z_order = z_pos || 0; }
    if (z_pos === undefined) { z_pos = z_order; }
    z_pos -= $camera.z;
    z_order -= $camera.z;
    
    if (($camera.x !== 0) || ($camera.y !== 0) || ($camera.angle !== 0) || ($camera.zoom !== 1)) {
        // Transform the arguments to account for the camera
        const mag = (typeof $camera.zoom === 'number') ? $camera.zoom : $camera.zoom(z);
        const C = $Math.cos($camera.angle) * mag, S = $Math.sin($camera.angle * rotation_sign()) * mag;
        const x = start.x - $camera.x, y = start.y - $camera.y;
        start = {x: x * C + y * S, y: y * C - x * S};
        size.x *= mag;
        size.y *= mag;
    }
    
    const skx = z_pos * $skewXZ, sky = z_pos * $skewYZ;
    let x = (start.x + skx) * $scaleX + $offsetX, y = (start.y + sky) * $scaleY + $offsetY;
    z_pos = z_pos * $scaleZ + $offsetZ;
    z_order = z_order * $scaleZ + $offsetZ;
    
    x = $Math.floor(x) >>> 0; y = $Math.floor(y) >>> 0;
    let width = $Math.round(size.x);
    const height = $Math.round(size.y);

    // Completely clipped
    if ((z_pos < $clipZ1 - 0.5) || (z_pos >= $clipZ2 + 0.5) ||
        (x > $clipX2) || (x + width < $clipX1) ||
        (y < $clipY1) || (y + height > $clipY2)) {
        return;
    }

    // The time for this call is mostly spent in the draw call
    // submission, not the execution. So, time the submission and move
    // that time from the "logic" to the "graphics" profiler. Due to
    // the limited precision of browser timing the measured time will
    // frequently be zero, but this call is made about 100x per frame
    // in most implementations for floor or ceiling rendering, so
    // it will occasionally catch the timer ticking over and be right
    // on average.

    const startTime = $performance.now();
    
    // TODO: Support both width and height for clipping below

    // Compute derivatives before clipping width
    let map_point_x = map_coord0.x;
    let map_point_y = map_coord0.y;
    let step_x = (map_coord1.x - map_coord0.x) / width
    let step_y = (map_coord1.y - map_coord0.y) / width;

    // Clip left
    if (x < $clipX1) {
        const dx = $clipX1 - x;
        x = $clipX1 >>> 0;
        map_point_x += step_x * dx;
        map_point_y += step_y * dx;
        width -= dx;
    }

    // Clip right
    if (x + width - 1 > $clipX2) {
        const dx = x + width - 1 - $clipX2;
        width -= dx;
    }

    width = width >>> 0;

    const color = {r:0, g:0, b:0, a:0};
    
    if (override_color === undefined) {
        override_blend = false;
    } else {
        override_blend = override_blend || "lerp";
        override_color = rgba(override_color);

        if ((override_blend === "lerp" && override_color.a < 1/32) ||
            (override_blend === "multiply" && $Math.min(override_color.r, override_color.g, override_color.b) > 0.96)) {
            // Blending will have no visible effect but will be slow, so disable it
            override_blend = false;
        }
    }

    // Preallocate the encoded span array for the graphics
    // command. Using a typed array seems to reduce garbage collection
    // substantially, even though it doesn't actually affect the
    // average cost of the writes or reads.
    //
    // Allocate the worst case, which is a series of blocks of length 1.
    //
    // Alternates header blocks and value blocks. For each block, the header
    // element specifies:
    //
    // - header & 0x1 is 1 if the entire block has alpha = 0xf and can be memcpy'd
    // - header & 0x2 is 1 if the block has alpha = 0x0 (in which case, there is
    //              no actual data in the block)
    // - header >> 2 is the length of the span.
    const color_data = new Uint16Array(2 * width);
    
    // Actually used elements (we always use the first element)
    let color_data_length = 1 >>> 0;

    if (invert_sprite_y === undefined) {
        invert_sprite_y = $scaleY < 0;
    }

    // Index in color_data where there the run (block) began
    let run_start_index = 0;

    // AND of all of the pixel_values for this run.
    // Only the alpha channel is actually used.
    let run_mask    = 0xffff;
    let run_is_skip = false;
    let run_length  = 0;

    const low_res = quality <= 0.5;
    let prev_read = -1;
    
    // Draw the scanline. Because it has constant camera-space z, the 
    // texture coordinate ("read_point") interpolates linearly
    // under perspective projection.
    for (let i = 0;
         i < width;
         ++i, map_point_x += step_x, map_point_y += step_y) {

        let pixel_value;

        if (low_res && (i & 1) === 0 && (prev_read !== -1)) {
            // Reuse the previous value to avoid the most expensive
            // part, which is the get_map_pixel_color() call. This could
            // be exploited further by having the actual runs be encoded
            // at half resolution, reducing the data transfer and storage
            // and making the RIGHT edges more consistent.
            pixel_value = prev_read;
        } else {
            // Call the low-level version, which avoids conversion to rgba() in the common case.
            // Nearly all of the time of this routine (including the actual drawing) is spent in
            // the following call.
            pixel_value = $get_map_pixel_color(map, map_point_x, map_point_y, min_layer, max_layer_exclusive, replacement_array, color, invert_sprite_y);
            prev_read = pixel_value;
        }

        if (pixel_value === -1) {
            if (! run_is_skip) {
                if (i > 0) {
                    // Complete the previous run
                    color_data[run_start_index] =
                        (run_length << 2) |
                        (((run_mask & 0xf000) === 0xf000) ? 1 : 0);
                    run_length = 0;
                    // Consume a new element
                    run_start_index = color_data_length++;
                }
                run_is_skip = true;
            }
            
            // Skip ahead to the next map cell because this one is
            // empty. This is a 15% net performance improvement for
            // rendering sparse hallway floors.
            const mx = $Math.floor(map_point_x), my = $Math.floor(map_point_y);

            // Just skip without even writing, since everything is transparent
            const before = i;
            for (; (i < width) && (mx === $Math.floor(map_point_x)) && (my === $Math.floor(map_point_y));
                 ++i, map_point_x += step_x, map_point_y += step_y) {
            }
            // The iterator will necessarily go one step too far, so
            // back everything up before the master iterator hits
            --i; map_point_x -= step_x; map_point_y -= step_y;

            // We're now at the end of this map cell
            run_length += i - before;
            
        } else {
            // Not in a skip. End the previous run if it was a skip
            if (run_is_skip) {
                color_data[run_start_index] = (run_length << 2) | 0x2;
                run_length = 0;
                run_is_skip = false;
                run_mask = 0xffff;
                // Consume a new element
                run_start_index = color_data_length++;
            }

            if (override_blend) {
                if (pixel_value >= 0) {
                    // Compute color from pixel, as it is not present yet
                    // because $get_pixel_color() used an optimized path.
                    color.a = ((pixel_value >>> 12) & 0xf) * (1 / 15);
                    color.b = ((pixel_value >>> 8) & 0xf) * (1 / 15);
                    color.g = ((pixel_value >>> 4) & 0xf) * (1 / 15);
                    color.r = (pixel_value & 0xf) * (1 / 15);
                    pixel_value = -2;
                }
                
                // The following surprisingly seem to cost almost
                // nothing, so we do not optimize them by performing
                // operations in fixed point.
                if (override_blend === "lerp") {
                    RGB_LERP(color, override_color, override_color.a, color);
                } else { // Multiply
                    RGB_MUL_RGB(color, override_color, color);
                }
            }
            
            // -2 = value in color
            pixel_value = pixel_value < 0 ? $colorToUint16(color) : pixel_value;

            run_mask &= pixel_value;
            color_data[color_data_length++] = pixel_value;
            ++run_length;
        } // if sprite present
    } // for i

    // End the last run
    if (run_is_skip) {
        color_data[run_start_index] = (run_length << 2) | 0x2;
    } else {
        color_data[run_start_index] = (run_length << 2) | (((run_mask & 0xf000) === 0xf000) ? 1 : 0);
    }

    $addGraphicsCommand({
        z: z_order,
        baseZ: z_order,
        opcode: 'SPN',
        x: x,
        y: y,
        dx: 1,
        dy: 0,
        data_length: color_data_length,
        data: color_data})

    $logicToGraphicsTimeShift += $performance.now() - startTime;
}