function computeFontSingleCharacterBounds(srcMask, char_size, bounds, c, index) {
    if (index === undefined) {
        index = fontChars.indexOf(c);
    }
    
    const firstWideGlyph = (FONT_ROWS - 2) * (FONT_COLS + 1);

    const charScale = (index < firstWideGlyph) ? 1 : 4;

    const charX = (index < firstWideGlyph) ?
          (index % (FONT_COLS + 1)) :
          ((index - firstWideGlyph) % (FONT_COLS / 4 + 1));

    const charY = (index < firstWideGlyph) ?
          Math.floor(index / (FONT_COLS + 1)) :
          (Math.floor((index - firstWideGlyph) / (FONT_COLS / 4 + 1)) + (FONT_ROWS - 2));

    // Find tightest non-black bounds on each character
    let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
    for (let y = charY * char_size.y; y < (charY + 1) * char_size.y; ++y) {
        for (let x = charX * char_size.x * charScale; x < (charX + 1) * char_size.x * charScale; ++x) {
            if (array2DGet(srcMask, x, y)) {
                x1 = Math.min(x, x1); y1 = Math.min(y, y1);
                x2 = Math.max(x, x2); y2 = Math.max(y, y2);
            }
        } // for x
    } // for y
    
    let empty = false;
    if (y1 === Infinity) {
        // The entire box was empty. Put both bounds in
        // the center of the box.
        y1 = y2 = ((charY + 0.5) * char_size.y) | 0;
        x1 = x2 = ((charX + 0.5) * char_size.y) | 0;
        empty = true;
    }
    
    const b = {
        x1:x1, y1:y1, x2:x2, y2:y2,
        empty:empty,
        
        // Used to visualize generated characters
        // in art tools
        generated:(bounds[c] && bounds[c].generated),
        
        // Used to simplify generation logic later
        srcX: charX * char_size.x, srcY:charY * char_size.y,
        srcWidth: char_size.x, srcHeight: char_size.y
    };

    bounds[c] = b;

    return b;
}