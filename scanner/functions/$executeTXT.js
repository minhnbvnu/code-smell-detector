function $executeTXT(cmd) {
    const height = cmd.height, width = cmd.width, color = cmd.color,
          str = cmd.str
    let   outline = cmd.outline, shadow = cmd.shadow;
    const clipX1 = cmd.clipX1, clipY1 = cmd.clipY1,
          clipX2 = cmd.clipX2, clipY2 = cmd.clipY2;
    const font = $fontArray[cmd.fontIndex];
    const data = font.$data.data;
    const fontWidth = font.$data.width;

    let x = cmd.x, y = cmd.y;

    if ((font.spacing.x === 0) && (outline & 0xF000) && (color & 0xF000)) {
        // Script font with outline and color. Draw in two passes so that
        // the connectors are not broken by outlines.
        
        // Disable color and re-issue the command to draw shadow and outline
        // before drawing the main text.
        cmd.color = 0;
        $executeTXT(cmd);
        cmd.color = color;

        // Pass through, disabling outline and shadow that were
        // already processed.
        outline = shadow = 0;
    }
    
    for (let c = 0; c < str.length; ++c) {
        // Remap the character to those in the font sheet
        const chr = str[c];
        const bounds = font.$bounds[chr];

        x += bounds.pre;
        if (chr !== ' ') {
            const tileY = $Math.floor(bounds.y1 / font.$charHeight) * font.$charHeight;
            const charWidth  = bounds.x2 - bounds.x1 + 1;
            const charHeight = bounds.y2 - bounds.y1 + 1;

            // Shift the destination down by the offset of this character relative to the tile
            for (let j = 0, dstY = y + bounds.y1 - tileY + bounds.yOffset; j < charHeight; ++j, ++dstY) {
                // On screen in Y?
                if (((dstY >>> 0) <= clipY2) && (dstY >= clipY1)) {
                    for (let i = 0, dstX = x, dstIndex = x + (dstY * $SCREEN_WIDTH), srcIndex = bounds.x1 + (bounds.y1 + j) * fontWidth;
                         i < charWidth;
                         ++i, ++dstX, ++dstIndex, ++srcIndex) {
                        
                        const bits = data[srcIndex];

                        // Most pixels in fonts are empty, so explicitly test if ANY bit
                        // is set before looking deeper
                        if (bits) {
                            let v = 0;
                            if (bits & 0x1) {                 // 0001 color = color
                                v = color;
                            } else if (outline & 0xf000) {
                                // Outline is on
                                if (bits & 0x8) {             // 1000 outline w/ shadow = shadow
                                    // Shadow if using outline
                                    v = shadow;
                                } else if (bits & 0x2) {      // 0010 outline. May also match 0100 and be ignored
                                    v = outline;
                                }
                            } else if (bits & 0x4) {          // 0100 shadow w/o outline
                                // Shadow
                                v = shadow;
                            }

                            // Could inline $pset code for performance and insert dstIndex. There
                            // is not any apparent performance difference on Chrome, however
                            if (v) { $pset(dstX, dstY, v, clipX1, clipY1, clipX2, clipY2); }
                        }
                    } // for i
                } // on screen y
            } // for j
            
        } // character in font

        x += (bounds.x2 - bounds.x1 + 1) + $postGlyphSpace(chr + (str[c] || ''), font) - font.$borderSize * 2 + bounds.post;
        
    } // for each character
}