function set_map_sprite(map, map_coord, sprite, layer) {
    layer = $Math.floor(layer || 0) | 0;
    let mx = $Math.floor(map_coord.x);
    let my = $Math.floor(map_coord.y);

    if (map.loop_x) { mx = loop(mx, map.size.x); }
    if (map.loop_y) { my = loop(my, map.size.y); }

    if ((layer >= 0) && (layer < map.layer.length) &&
        (mx >= 0) && (my >= 0) &&
        (mx < map.size.x) && (my < map.size.y)) {
        // In bounds
        map.layer[layer][mx][my] = sprite;
    }
}