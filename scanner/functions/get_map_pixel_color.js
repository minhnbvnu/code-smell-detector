function get_map_pixel_color(map, map_coord, min_layer, max_layer_exclusive, replacement_array, result, invert_sprite_y) {
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
        if (result) {
            result.a = 0;
            return result;
        } else {
            return undefined;
        }
    }

    if (invert_sprite_y === undefined) {
        invert_sprite_y = false;
    }

    // The caller needs to be able to distinguish between
    // out of bounds/no sprite and a sprite with alpha = 0,
    // so we have to have an explicit undefined option for
    // the return value.
    const had_result = result;
    if (result === undefined) {
        result = {r:0, g:0, b:0, a:0};
    }
    
    const pixel = $get_map_pixel_color(map, map_coord.x, map_coord.y, min_layer, max_layer_exclusive, replacement_array, result, invert_sprite_y);
    if (pixel === -1) {
        if (had_result) {
            return result;
        } else {
            return undefined;
        }
    }

    if (pixel === -2) {
        return result;
    } else {
        // Unpack
        result.a = ((pixel >>> 12) & 0xf) * (1 / 15);
        result.b = ((pixel >>> 8) & 0xf) * (1 / 15);
        result.g = ((pixel >>> 4) & 0xf) * (1 / 15);
        result.r = (pixel & 0xf) * (1 / 15);
        return result;
    }
}