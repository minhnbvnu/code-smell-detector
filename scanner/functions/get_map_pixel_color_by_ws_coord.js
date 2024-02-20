function get_map_pixel_color_by_ws_coord(map, ws_coord, ws_z, replacement_array, result) {
    if (replacement_array && ! Array.isArray(replacement_array)) { $error('The replacement array for get_map_pixel_color_by_ws_coord() must be nil or an array'); }
    if (! map.spritesheet_table) { $error('The first argument to get_map_pixel_color_by_ws_coord() must be a map'); }
    const layer = (((ws_z || 0) - $offsetZ) / $scaleZ - map.z_offset) / map.z_scale;
    return get_map_pixel_color(map, transform_ws_to_map_space(map, ws_coord), layer, replacement_array, result);
}