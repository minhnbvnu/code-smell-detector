function set_map_sprite_by_ws_coord(map, ws_coord, sprite, z) {
    const layer = ((z || 0) - $offsetZ) / ($scaleZ * map.z_scale);
    return set_map_sprite(map, transform_ws_to_map_space(map, ws_coord), sprite, layer);
}