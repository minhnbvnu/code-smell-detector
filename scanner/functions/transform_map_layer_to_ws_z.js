function transform_map_layer_to_ws_z(map, layer) {
    if (! map.$type && map.$type === 'map') {
        $error('First argument to transform_map_layer_to_ws_z() must be a map');
    }
    return layer * map.z_scale + map.z_offset;
}