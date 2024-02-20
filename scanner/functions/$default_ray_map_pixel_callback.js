function $default_ray_map_pixel_callback(sprite, sprite_pixel_coord, ws_normal, ray, map, distance, ws_coord, map_coord) {
    // Inlined optimization of: if (get_sprite_pixel_color(sprite, sprite_pixel_coord).a >= 0.5) {
    const x = ((sprite.scale.x > 0) ? sprite_pixel_coord.x : (sprite.size.x - 1 - sprite_pixel_coord.x)) | 0;
    const y = ((sprite.scale.y > 0) ? sprite_pixel_coord.y : (sprite.size.y - 1 - sprite_pixel_coord.y)) | 0;
    const data = sprite.$spritesheet.$uint16Data;
    const pixel = data[((sprite.$x >>> 0) + x) + ((sprite.$y >>> 0) + y) * (data.width >>> 0)] >>> 0;

    if (((pixel >>> 12) & 0xf) >= 8) {
        return sprite;
    } else {
        return undefined;
    }
}