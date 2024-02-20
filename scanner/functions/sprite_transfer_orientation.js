function sprite_transfer_orientation(orient_sprite, content_sprite) {
    if (! orient_sprite || ! content_sprite || ! orient_sprite.$spritesheet || ! content_sprite.$spritesheet) {
        $error('sprite_match_orientation() requires two sprites');
    }

    const base = orient_sprite.base;

    if (base.$spritesheet !== orient_sprite.$spritesheet) {
        // Transposed
        content_sprite = content_sprite.rotated_270.x_flipped;
    }

    if (orient_sprite.scale.x < 0) {
        content_sprite = content_sprite.x_flipped;
    }

    if (orient_sprite.scale.y < 0) {
        content_sprite = content_sprite.y_flipped;
    }
    
    return content_sprite;
}