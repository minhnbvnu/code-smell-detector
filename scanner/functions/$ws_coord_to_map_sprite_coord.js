function $ws_coord_to_map_sprite_coord(map, ws_coord, layer, sprite_coord) {
    // = transform_ws_to_map_space(map, ws_coord);
    const map_coord_x = (ws_coord.x - map.offset.x) / map.sprite_size.x,
          map_coord_y = (ws_coord.y - map.offset.y) / map.sprite_size.y;

    const map_size_x = map.size.x, map_size_y = map.size.y;
    
    if (map.loop_x && (map_coord_x < 0 || map_coord_x >= map_size_x)) {
        map_coord_x -= $Math.floor(map_coord_x / map_size_x) * map_size_x;
    }
    
    if (map.loop_y && (map_coord_y < 0 || map_coord_y >= map_size_y)) {
        map_coord_y -= $Math.floor(map_coord_y / map_size_y) * map_size_y;
    }

    // Integer version of the map coordinate
    const mx = $Math.floor(map_coord_x) | 0, my = $Math.floor(map_coord_y) | 0;

    // Map coord (0, 0) is the *corner* of the corner sprite
    const ssX = (map.sprite_size.x >>> 0) - 1, ssY = (map.sprite_size.y >>> 0) - 1;

    sprite_coord.x = $clamp(((map_coord_x - mx) * (ssX + 1)) | 0, 0, ssX);
    sprite_coord.y = $clamp(((map_coord_y - my) * (ssY + 1)) | 0, 0, ssY);
}