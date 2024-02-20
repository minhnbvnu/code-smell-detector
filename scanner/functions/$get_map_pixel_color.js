function $get_map_pixel_color(map, map_coord_x, map_coord_y, min_layer, max_layer_exclusive, replacement_array, result, invert_sprite_y) {
    const map_size_x = map.size.x, map_size_y = map.size.y;
    // Inlined $loop()
    if (map.loop_x && (map_coord_x < 0 || map_coord_x >= map_size_x)) {
        map_coord_x -= $Math.floor(map_coord_x / map_size_x) * map_size_x;
    }
    if (map.loop_y && (map_coord_y < 0 || map_coord_y >= map_size_y)) {
        map_coord_y -= $Math.floor(map_coord_y / map_size_y) * map_size_y;
    }

    // Integer version of the map coordinate
    const mx = $Math.floor(map_coord_x) | 0, my = $Math.floor(map_coord_y) | 0;
    
    // Was any surface hit?
    let hit = false;

    // Result value temporarily encoded in scalars to avoid dereference costs
    let result_a = 0, result_b = 0, result_g = 0, result_r = 0;

    // In bounds test
    if ((mx >= 0) && (my >= 0) && (mx < map_size_x) && (my < map_size_y)) {

        // Map coord (0, 0) is the *corner* of the corner sprite
        const ssX = (map.sprite_size.x >>> 0) - 1, ssY = (map.sprite_size.y >>> 0) - 1;
        let spriteCoordX = $clamp(((map_coord_x - mx) * (ssX + 1)) | 0, 0, ssX);
        let spriteCoordY = $clamp(((map_coord_y - my) * (ssY + 1)) | 0, 0, ssY);

        // Account for the automatic flipping that occurs to sprites when rendering
        if (($scaleY < 0) !== invert_sprite_y) { spriteCoordY = (ssY - spriteCoordY) | 0; }
        if ($scaleX < 0) { spriteCoordX = (ssX - spriteCoordX) | 0; }

        // Iterate from the top down, compositing
        const layer_array = map.layer;
        for (let layer = max_layer_exclusive - 1; layer >= min_layer; --layer) {
            let sprite = layer_array[layer][mx][my];
            if (sprite) {
                if (replacement_array) {
                    for (let i = 0; i < replacement_array.length; i += 2) {
                        if (replacement_array[i] === sprite) {
                            sprite = replacement_array[i + 1];
                            break;
                        }
                    }
                    if (! sprite) { continue; }
                }

                // Manually inlined and streamlined code from
                // get_sprite_pixel_color, which saves about 2 ms when
                // sampling every pixel on screen. Coordinate
                // computation needs to be done per-sprite because
                // they may be flipped. It is slightly faster (probably because of
                // cache coherence) to flip the X coordinate than to read from
                // the flipped X image data
                const x = ((sprite.scale.x > 0) ? spriteCoordX : (ssX - spriteCoordX)) >>> 0;
                const y = ((sprite.scale.y > 0) ? spriteCoordY : (ssY - spriteCoordY)) >>> 0;

                const data = sprite.$spritesheet.$uint16Data;
                const pixel = data[((sprite.$x >>> 0) + x) + ((sprite.$y >>> 0) + y) * (data.width >>> 0)] >>> 0;

                const alpha16 = pixel & 0xF000;
                if ((result_a === 0) && (alpha16 === 0xF000)) {
                    // Common case: we've hit a fully opaque value on
                    // the first non-transparent one. Do not convert
                    // to rgba() because this may be called from the
                    // inner loop of draw_map_horizontal_span(). The
                    // caller will handle the case where they need to
                    // convert.
                    return pixel;
                } else if (alpha16 !== 0) {

                    // Unpack and switch to premultiplied
                    const layer_color_a = ((pixel >>> 12) & 0xf) * (1 / 15);
                    const k = (1 / 15) * layer_color_a;
                    const layer_color_b = ((pixel >>> 8) & 0xf) * k;
                    const layer_color_g = ((pixel >>> 4) & 0xf) * k;
                    const layer_color_r = (pixel & 0xf) * k;

                    // Composite layer_color *under* the current result,
                    // since we're working top down
                    if (result_a === 0) {
                        // First non-transparent value, just override
                        result_r = layer_color_r;
                        result_g = layer_color_g;
                        result_b = layer_color_b;
                        result_a = layer_color_a;
                    } else {
                        // Composite in premultiplied color space
                        const k = 1 - result_a;
                        result_r += layer_color_r * k;
                        result_g += layer_color_g * k;
                        result_b += layer_color_b * k;
                        result_a += layer_color_a * k;
                    }

                    // Fully saturated after compositing
                    if (result_a >= 0.995) {
                        // No need to convert *back* from premultiplied because a ~= 1
                        result.r = result_r;
                        result.g = result_g;
                        result.b = result_b;
                        result.a = result_a;
                        return -2;
                    }
                    hit = true;
                    
                } // sprite
            } // layer
        }
    }

    // Composited or never hit any sprite
    
    if (hit) {
        // Convert back from premultiplied, if needed
        result.a = result_a;
        if (result_a > 0 && result_a < 0.995) {
            const inv_a = 1 / result_a;
            result.r = result_r * inv_a;
            result.g = result_g * inv_a;
            result.b = result_b * inv_a;
        } else {
            // No need to convert
            result.r = result_r;
            result.g = result_g;
            result.b = result_b;
        }
        // Composited
        return -2;
    } else {
        // Out of bounds or no sprite
        result.r = result.g = result.b = result.a = 0;
        return -1;
    }
}