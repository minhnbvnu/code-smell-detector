function get_sprite_pixel_color(spr, pos, result) {
    if (! (spr && spr.$spritesheet)) {
        $error('Called get_sprite_pixel_color() on an object that was not a sprite asset. (' + unparse(spr) + ')');
    }

    const x = ((spr.scale.x > 0) ? pos.x : (spr.size.x - 1 - pos.x)) | 0;
    const y = ((spr.scale.y > 0) ? pos.y : (spr.size.y - 1 - pos.y)) | 0;
    
    if ((x < 0) || (x >= spr.size.x) || (y < 0) || (y >= spr.size.y)) {
        if (result) {
            result.a = result.r = result.g = result.b = 0;
        } else {
            return undefined;
        }
    } else {
        const data = spr.$spritesheet.$uint16Data;
        const pixel = data[((spr.$x >>> 0) + x) + ((spr.$y >>> 0) + y) * (data.width >>> 0)] >>> 0;

        result = result || {r:0, g:0, b:0, a:0};
        
        result.a = ((pixel >>> 12) & 0xf) * (1 / 15);
        result.b = ((pixel >>> 8) & 0xf) * (1 / 15);
        result.g = ((pixel >>> 4) & 0xf) * (1 / 15);
        result.r = (pixel & 0xf) * (1 / 15);
        
        return result;
    }
}