function get_map_sprite_by_ws_coord(map, ws_coord, ws_z, replacement_array) {
    const layer = ((ws_z || 0) - $offsetZ - map.z_offset) / ($scaleZ * map.z_scale);
    return get_map_sprite(map, transform_ws_to_map_space(map, ws_coord), layer, replacement_array);
}