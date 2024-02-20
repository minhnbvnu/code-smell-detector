function transform_ws_to_map_space(map, ws_coord) {
    return xy((ws_coord.x - map.offset.x) / map.sprite_size.x,
              (ws_coord.y - map.offset.y) / map.sprite_size.y);
}