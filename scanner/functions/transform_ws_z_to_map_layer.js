function transform_ws_z_to_map_layer(map, z) {
    if (! map.$type && map.$type === 'map') {
        $error('First argument to transform_draw_z_to_map_layer() must be a map');
    }
    return (z - map.z_offset) / map.z_scale;
}