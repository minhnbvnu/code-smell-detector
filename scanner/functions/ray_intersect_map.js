function ray_intersect_map(ray, map, layer, sprite_callback, pixel_callback, replacement_array, run_callback_on_empty_sprites) {
    if (sprite_callback === undefined && pixel_callback === undefined) {
        pixel_callback = $default_ray_map_pixel_callback;
    }

    layer = layer || 0;
    if (layer < 0 || layer >= map.layer.length) {
        $error('ray_intersect_map() requires the layer to be specified and in bounds for the map');
    }
    
    // Default to an infinite ray
    if (ray.length === undefined) {
        ray.length = Infinity;
    }

    // Normalize the direction
    {
        const inv = 1 / $Math.hypot(ray.dir.x, ray.dir.y);
        ray.dir.x *= inv; ray.dir.y *= inv;
    }

    // Will be mutated below
    const pixel_ray = {
        pos: xy(0, 0),
        dir: ray.dir,
        length: 0};

    // Will be mutated below
    const ws_normal = xy(0, 0);
    const map_coord = xy(0, 0);
    const ps_coord = xy(0, 0);
    const ws_coord = xy(0, 0);

    const inv_sprite_size_x = 1 / map.sprite_size.x;
    const inv_sprite_size_y = 1 / map.sprite_size.y;

    const one = xy(1, 1);
    const inf = xy(Infinity, Infinity);

    // Take the ray into map pixel space by offsetting the origin
    const map_pixel_start = xy(ray.pos.x - map.offset.x, ray.pos.y - map.offset.y);

    // The iterator copies the position and direction
    for (const it = $makeRayGridIterator(map_pixel_start, ray.dir, ray.length, map.size, map.sprite_size);
         it.insideGrid && (it.enterDistance < it.ray.length);
         $advanceRayGridIterator(it)) {
        
        // World-space normal along which we entered this cell
        ws_normal.x = ws_normal.y = 0;
        ws_normal[it.enterAxis] = -it.step[it.enterAxis];

        // World-space point at which we entered the cell. Note that
        // this is based on the original world-space ray, not the iterator's
        // map-pixel space ray.
        ws_coord.x = ray.pos.x + it.enterDistance * it.ray.dir.x;
        ws_coord.y = ray.pos.y + it.enterDistance * it.ray.dir.y;

        // Bump into the cell and then round down to get a map cell
        // coordinate.
        map_coord.x = $Math.floor((ws_coord.x - ws_normal.x * 0.5 - map.offset.x) * inv_sprite_size_x);
        map_coord.y = $Math.floor((ws_coord.y - ws_normal.y * 0.5 - map.offset.y) * inv_sprite_size_y);

        // Get the sprite
        const sprite = get_map_sprite(map, map_coord, layer, replacement_array);
        
        if (sprite || run_callback_on_empty_sprites) {
            $ws_coord_to_map_sprite_coord(map, ws_coord, layer, ps_coord);
            
            if (sprite_callback) {
                const result = sprite_callback(sprite, ps_coord, ws_normal, it.ray, map, it.enterDistance, ws_coord, map_coord);
                if (result !== undefined) {
                    // Shorten ray
                    ray.length = $distanceSquared2D(ws_coord, ray.pos);
                    return result;
                }
            }

            if (sprite && pixel_callback) {

                pixel_ray.pos.x = ws_coord.x; pixel_ray.pos.y = ws_coord.y;
                pixel_ray.length = $Math.min(it.exitDistance.x, it.exitDistance.y) - it.enterDistance;

                for (const pit = $makeRayGridIterator(pixel_ray.pos, pixel_ray.dir, pixel_ray.length, inf, one);
                     pit.insideGrid && (pit.enterDistance < pit.ray.length);
                     $advanceRayGridIterator(pit)) {

                    // World-space normal along which we entered this pixel
                    ws_normal.x = ws_normal.y = 0;
                    ws_normal[it.enterAxis] = -pit.step[it.enterAxis];

                    // World-space point at which we entered the pixel
                    ws_coord.x = pit.ray.pos.x + pit.enterDistance * pit.ray.dir.x;
                    ws_coord.y = pit.ray.pos.y + pit.enterDistance * pit.ray.dir.y;

                    $ws_coord_to_map_sprite_coord(map, ws_coord, layer, ps_coord);

                    const result = pixel_callback(sprite, ps_coord, ws_normal, it.ray, map, it.enterDistance, ws_coord, map_coord);
                    if (result !== undefined) {
                        // Shorten ray
                        ray.length = pit.enterDistance + it.enterDistance;
                        return result;
                    }
                } // For each pixel
            }
        } // if sprite
        
    }  // while

    return undefined;
}