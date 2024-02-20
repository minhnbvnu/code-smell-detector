function set_background(c) {
    if (Array.isArray(c) && c.sprite_size && Array.isArray(c[0])) {
        // c was a sprite sheet
        c = c[0][0];
    }

    if (c.$spritesheet && (c.$spritesheet.size.x !== $SCREEN_WIDTH || c.$spritesheet.size.y !== $SCREEN_HEIGHT ||
                           c.size.x !== $SCREEN_WIDTH || c.size.y !== $SCREEN_HEIGHT)) {
        $error('The sprite and its spritesheet for set_background() must be exactly the screen size.')
    }
    
    $background = c;
}