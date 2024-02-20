function computeAllFontCharacterBounds(srcMask, char_size, bounds) {
    // Tightest vertical bounding box across all characters
    let tightY1 = Infinity, tightY2 = -Infinity;
    
    // Tightest width across all characters
    let _charWidth = 0;

    for (let charY = 0; charY < FONT_ROWS; ++charY) {
        const charScale = (charY < FONT_ROWS - 2) ? 1 : 4;
        for (let charX = 0; charX < FONT_COLS / charScale; ++charX) {
            const yTile = char_size.y * charY;
            
            // fontChars is actually an extra character wide because
            // it has newlines in it
            const index =
                  charX + Math.min(charY, FONT_ROWS - 2) * (FONT_COLS + 1) +
                  Math.max(charY - (FONT_ROWS - 2), 0) * (FONT_COLS / 4 + 1);
            const c = fontChars[index];
            
            if (c !== ' ') {
                const b = computeFontSingleCharacterBounds(srcMask, char_size, bounds, c, index);
                tightY1 = Math.min(tightY1, b.y1 - yTile);
                tightY2 = Math.max(tightY2, b.y2 - yTile);     
                _charWidth = Math.max(_charWidth, Math.ceil((b.x2 - b.x1 + 1) / charScale));
            } // if not space
        }
    }
    
    // Compute tight bounds on letters so that we can repack.
    return [tightY1, tightY2, _charWidth];
}