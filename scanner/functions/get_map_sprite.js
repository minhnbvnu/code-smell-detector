function get_map_sprite(map, map_coord, layer, replacement_array) {
    if (! map.spritesheet_table) { $error('The first argument to get_map_sprite() must be a map'); }
    layer = $Math.floor(layer || 0) | 0;
    let mx = $Math.floor(map_coord.x);
    let my = $Math.floor(map_coord.y);

    if (map.loop_x) { mx = $loop(mx, 0, map.size.x); }
    if (map.loop_y) { my = $loop(my, 0, map.size.y); }
    
    if ((layer >= 0) && (layer < map.layer.length) &&
        (mx >= 0) && (my >= 0) &&
        (mx < map.size.x) && (my < map.size.y)) {
        // In bounds
        let sprite = map.layer[layer][mx][my];
        if (replacement_array) {
            for (let i = 0; i < replacement_array.length; i += 2) {
                if (replacement_array[i] === sprite) {
                    return replacement_array[i + 1];
                    break;
                }
            }
        }

        return sprite;

    } else {
        return undefined;
    }
}