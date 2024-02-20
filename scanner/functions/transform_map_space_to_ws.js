function transform_map_space_to_ws(map, map_coord) {
    return xy(map_coord.x * map.sprite_size.x + map.offset.x,
              map_coord.y * map.sprite_size.y + map.offset.y);
}