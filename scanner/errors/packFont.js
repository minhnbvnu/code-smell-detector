function packFont(font, borderSize, shadowSize, baseline, char_size, spacing, srcMask, generateMissingCharacters = true, char_min_width = 0) {
    font.spacing = spacing;
    font.$borderSize = borderSize;
    font.$shadowSize = shadowSize;

    // Maps characters to tight bounding boxes in the
    // srcMask. Elements that are .empty have no pixels within
    // them. Elements that are .generated had no pixels in the
    // original font sheet but were synthesized during load.
    let bounds = {};

    let [tightY1, tightY2, _charWidth] = computeAllFontCharacterBounds(srcMask, char_size, bounds);

    if (generateMissingCharacters) {
        // Do not generate accents if the font is small
        // because it might no accent is probably better.
        if (tightY2 - tightY1 + 1 >= 8) {
            packFontCopy('‘', "`", srcMask, bounds);
            packFontCopy('ˆ', '^', srcMask, bounds);
            packFontCopy('˚', '°', srcMask, bounds);
            packFontCopy('˜', '~', srcMask, bounds);
            packFontCopy('ˇ', 'ˆ', srcMask, bounds, 1, -1);
            packFontCombine('̈', '.', '.', srcMask, bounds, '', '', 'after');
        }

        packFontCombine(';', ',', '.', srcMask, bounds, '', 'top', 'right');
        packFontGenerateAccent(':', '.', '.', srcMask, bounds);
        
        // Degree from exponent zero
        packFontCopy('°', 'ᵒ', srcMask, bounds);
        packFontCopy('■', '◼', srcMask, bounds);
        packFontCopy('◉', '●', srcMask, bounds);
        
        packFontCopy('И', 'N', srcMask, bounds, -1);
        packFontCopy('Я', 'R', srcMask, bounds, -1);
        packFontCopy('Є', 'Э', srcMask, bounds, -1);
        packFontCopy('є', 'э', srcMask, bounds, -1);
        
        packFontCopy('↗', '↖', srcMask, bounds, -1);
        packFontCopy('↙', '↖', srcMask, bounds, 1, -1);
        packFontCopy('↘', '↙', srcMask, bounds, -1);
        packFontCopy('▶', '◀', srcMask, bounds, -1);
        packFontCopy('→', '←', srcMask, bounds, -1);
        packFontCopy('´', '‘', srcMask, bounds, -1);
        packFontCopy('>', '<', srcMask, bounds, -1);
        packFontCopy(')', '(', srcMask, bounds, -1);
        packFontCopy('}', '{', srcMask, bounds, -1);
        packFontCopy('⁾', '⁽', srcMask, bounds, -1);
        packFontCopy('/', '\\', srcMask, bounds, -1);
        packFontCopy('⌉', '⌈', srcMask, bounds, -1);
        packFontCopy('⌊', '⌈', srcMask, bounds, 1, -1);
        packFontCopy('⌋', '⌊', srcMask, bounds, -1);
        packFontSuperimpose('[', '⌊', '⌈', srcMask, bounds);
        packFontCopy(']', '[', srcMask, bounds, -1);
        packFontCopy('¿', '?', srcMask, bounds, -1, -1);
        packFontCopy('¡', '!', srcMask, bounds, 1, -1);
        packFontCopy('↓', '↑', srcMask, bounds, 1, -1);
        packFontCopy('▼', '▲', srcMask, bounds, 1, -1);
        packFontCopy('∪', '∩', srcMask, bounds, 1, -1);
        // Prefer flipping the union symbol, but if neither is present
        // then flip the letter U
        packFontCopy('∩', 'U', srcMask, bounds, 1, -1);
        packFontCopy('∪', '∩', srcMask, bounds, 1, -1);
        
        packFontGenerateFraction('¼', '¹', '⁴', srcMask, bounds);
        packFontGenerateFraction('½', '¹', '²', srcMask, bounds);
        packFontGenerateFraction('¾', '⁴', '³', srcMask, bounds);
        packFontGenerateFraction('⅓', '¹', '³', srcMask, bounds);
        packFontGenerateFraction('⅔', '²', '³', srcMask, bounds);
        packFontGenerateFraction('⅕', '¹', '⁵', srcMask, bounds);

        packFontGenerateAccent('İ', 'I', '.', srcMask, bounds);

        packFontGenerateAccent('À', 'A', '`', srcMask, bounds);
        packFontGenerateAccent('à', 'a', '`', srcMask, bounds);
        packFontGenerateAccent('È', 'E', '`', srcMask, bounds);
        packFontGenerateAccent('è', 'e', '`', srcMask, bounds);
        packFontGenerateAccent('Ò', 'O', '`', srcMask, bounds);
        packFontGenerateAccent('ò', 'o', '`', srcMask, bounds);
        packFontGenerateAccent('Ì', 'I', '`', srcMask, bounds);
        packFontGenerateAccent('ì', 'ı', '`', srcMask, bounds);
        packFontGenerateAccent('Ù', 'U', '`', srcMask, bounds);
        packFontGenerateAccent('ù', 'u', '`', srcMask, bounds);
        packFontGenerateAccent('Ù', 'U', '`', srcMask, bounds);
        packFontGenerateAccent('Ś', 'S', '´', srcMask, bounds);
        packFontGenerateAccent('ś', 'S', '´', srcMask, bounds);
        packFontGenerateAccent('Š', 'S', 'ˇ', srcMask, bounds);
        packFontGenerateAccent('š', 's', 'ˇ', srcMask, bounds);
        packFontGenerateTail('Ş', 'S', srcMask, bounds);
        packFontGenerateTail('ş', 's', srcMask, bounds);
        packFontSuperimpose('Ł', 'L', '/', srcMask, bounds);
        packFontSuperimpose('ł', 'l', '/', srcMask, bounds);
        packFontSuperimpose('Ø', 'O', '/', srcMask, bounds);    
        packFontGenerateTick('Ґ', 'Γ', srcMask, bounds, 'top-jam');
        packFontGenerateTick('ґ', 'г', srcMask, bounds, 'top-jam');
        packFontSuperimpose('$', 'S', '|', srcMask, bounds);
        packFontGenerateFraction('%', 'ᵒ', 'ᵒ', srcMask, bounds);

        packFontGenerateAccent('Á', 'A', '´', srcMask, bounds);
        packFontGenerateAccent('á', 'a', '´', srcMask, bounds);
        packFontGenerateAccent('É', 'E', '´', srcMask, bounds);
        packFontGenerateAccent('é', 'e', '´', srcMask, bounds);
        packFontGenerateAccent('Ó', 'O', '´', srcMask, bounds);
        packFontGenerateAccent('ó', 'o', '´', srcMask, bounds);
        packFontGenerateAccent('Í', 'I', '´', srcMask, bounds);
        packFontGenerateAccent('í', 'ı', '´', srcMask, bounds);
        packFontGenerateAccent('Ú', 'U', '´', srcMask, bounds);
        packFontGenerateAccent('ú', 'u', '´', srcMask, bounds);
        packFontGenerateAccent('Ć', 'C', '´', srcMask, bounds);
        packFontGenerateAccent('ć', 'c', '´', srcMask, bounds);
        packFontGenerateAccent('Ž', 'Z', 'ˇ', srcMask, bounds);
        packFontGenerateAccent('ž', 'z', 'ˇ', srcMask, bounds);
        packFontGenerateAccent('Ź', 'Z', '´', srcMask, bounds);
        packFontGenerateAccent('ź', 'z', '´', srcMask, bounds);
        packFontGenerateAccent('Ż', 'Z', '.', srcMask, bounds);
        packFontGenerateAccent('ż', 'z', '.', srcMask, bounds);
        packFontSuperimpose('ø', 'o', '/', srcMask, bounds);
        
        packFontGenerateAccent('Â', 'A', 'ˆ', srcMask, bounds);
        packFontGenerateAccent('â', 'a', 'ˆ', srcMask, bounds);
        packFontGenerateAccent('Ê', 'E', 'ˆ', srcMask, bounds);
        packFontGenerateAccent('ê', 'e', 'ˆ', srcMask, bounds);
        packFontGenerateAccent('Ô', 'O', 'ˆ', srcMask, bounds);
        packFontGenerateAccent('ô', 'o', 'ˆ', srcMask, bounds);
        packFontGenerateAccent('Î', 'I', 'ˆ', srcMask, bounds);
        packFontGenerateAccent('î', 'ı', 'ˆ', srcMask, bounds);
        packFontGenerateAccent('Û', 'U', 'ˆ', srcMask, bounds);
        packFontGenerateAccent('û', 'u', 'ˆ', srcMask, bounds);
        packFontGenerateAccent('Ñ', 'N', '˜', srcMask, bounds);
        packFontGenerateAccent('ñ', 'n', '˜', srcMask, bounds);
        packFontGenerateAccent('Й', 'И', 'ˇ', srcMask, bounds);
        packFontSuperimpose('Ж', 'X', '|', srcMask, bounds);
        packFontCopy('З', '3', srcMask, bounds);
        packFontCopy('П', 'Π', srcMask, bounds);
        packFontCombine('Æ', 'A', 'E', srcMask, bounds, '', '', 'after-jam');
        packFontCombine('Œ', 'O', 'E', srcMask, bounds, '', '', 'after-jam');

        packFontGenerateAccent('Ä', 'A', '̈', srcMask, bounds);
        packFontGenerateAccent('ä', 'a', '̈', srcMask, bounds);
        packFontGenerateAccent('Ë', 'E', '̈', srcMask, bounds);
        packFontGenerateAccent('ë', 'e', '̈', srcMask, bounds);
        packFontGenerateAccent('Ö', 'O', '̈', srcMask, bounds);
        packFontGenerateAccent('ö', 'o', '̈', srcMask, bounds);
        packFontGenerateAccent('Ï', 'I', '̈', srcMask, bounds);
        packFontGenerateAccent('ï', 'ı', '̈', srcMask, bounds);
        packFontGenerateAccent('Ü', 'U', '̈', srcMask, bounds);
        packFontGenerateAccent('ü', 'u', '̈', srcMask, bounds);
        packFontGenerateAccent('Ń', 'N', '´', srcMask, bounds);
        packFontGenerateAccent('ń', 'n', '´', srcMask, bounds);    
        packFontGenerateAccent('й', 'и', 'ˇ', srcMask, bounds);
        packFontCombine('æ', 'a', 'e', srcMask, bounds, '', '', 'after-jam');
        packFontCombine('œ', 'o', 'e', srcMask, bounds, '', '', 'after-jam');

        packFontGenerateAccent('Å', 'A', '˚', srcMask, bounds);
        packFontGenerateAccent('å', 'a', '˚', srcMask, bounds);
        packFontGenerateAccent('Ř', 'R', 'ˇ', srcMask, bounds);
        packFontGenerateAccent('ř', 'r', 'ˇ', srcMask, bounds);
        packFontGenerateAccent('Ď', 'D', 'ˇ', srcMask, bounds);
        packFontGenerateTick('ď', 'd', srcMask, bounds);
        packFontGenerateAccent('Ý', 'Y', '´', srcMask, bounds);
        packFontGenerateAccent('ý', 'y', '´', srcMask, bounds);
        packFontGenerateAccent('Ů', 'U', '˚', srcMask, bounds);
        packFontGenerateAccent('ů', 'u', '˚', srcMask, bounds);
        packFontGenerateAccent('Ň', 'N', 'ˇ', srcMask, bounds);
        packFontGenerateAccent('ň', 'n', 'ˇ', srcMask, bounds);
        packFontErode('♡', '♥', srcMask, bounds); 
        packFontErode('○', '●', srcMask, bounds); 
        packFontErode('◻', '◼', srcMask, bounds); 
        packFontErode('△', '▲', srcMask, bounds); 
        packFontErode('♢', '♦', srcMask, bounds);
        packFontSuperimpose('⊗', '×', '○', srcMask, bounds);
        packFontSuperimpose('±', '+', '_', srcMask, bounds);
        
        packFontGenerateAccent('Ã', 'A', '˜', srcMask, bounds);
        packFontGenerateAccent('ã', 'a', '˜', srcMask, bounds);
        packFontGenerateTail('Ę', 'E', srcMask, bounds);
        packFontGenerateTail('ę', 'e', srcMask, bounds);
        packFontGenerateAccent('Õ', 'O', '˜', srcMask, bounds);
        packFontGenerateAccent('õ', 'o', '˜', srcMask, bounds);
        packFontGenerateAccent('Ў', 'y', 'ˇ', srcMask, bounds, true);
        packFontGenerateAccent('ў', 'y', 'ˇ', srcMask, bounds);
        packFontGenerateTail('Ç', 'C', srcMask, bounds);
        packFontGenerateTail('ç', 'c', srcMask, bounds);
        packFontSuperimpose('∅', '○', '/', srcMask, bounds);
        packFontSuperimpose('≠', '=', '/', srcMask, bounds);
        packFontSuperimpose('≤', '<', '_', srcMask, bounds);
        packFontCopy('≥', '≤', srcMask, bounds, -1);
        packFontSuperimpose('¥', 'Y', '=', srcMask, bounds);
        packFontSuperimpose('€', 'C', '=', srcMask, bounds);
        packFontCombine('‖', '|', '|', srcMask, bounds, '', '', 'after');
        // Three period combine
        if (packFontCombine('…', '.', '.', srcMask, bounds, '', '', 'after')) {
            packFontCombine('…', '…', '.', srcMask, bounds, '', '', 'after');
        }
        packFontCombine('«', '<', '<', srcMask, bounds, '', '', 'after');
        packFontCopy('»', '«', srcMask, bounds, -1);

        packFontGenerateTail('Ą', 'A', srcMask, bounds, 'right');
        packFontGenerateTail('ą', 'a', srcMask, bounds);
        packFontGenerateAccent('Ě', 'E', 'ˇ', srcMask, bounds);
        packFontGenerateAccent('ě', 'e', 'ˇ', srcMask, bounds);
        packFontGenerateAccent('Ť', 'T', 'ˇ', srcMask, bounds);
        packFontGenerateTick('ť', 't', srcMask, bounds);
        packFontGenerateAccent('Ğ', 'G', 'ˇ', srcMask, bounds);
        packFontGenerateAccent('ğ', 'g', 'ˇ', srcMask, bounds);
        packFontGenerateAccent('Č', 'C', 'ˇ', srcMask, bounds);
        packFontGenerateAccent('č', 'c', 'ˇ', srcMask, bounds);
        packFontCombine('"', '\'', '\'', srcMask, bounds, '', '', 'after');
        packFontCopy('∈', 'Є', srcMask, bounds);
        packFontErode('☆', '★', srcMask, bounds);
        
        packFontCopy('⍈', '⍇', srcMask, bounds, -1);
        packFontCopy('⍗', '⍐', srcMask, bounds, +1, -1);
        packFontCopy('⬙', '⦸', srcMask, bounds, -1);
        packFontCombine('①', '◉', '¹', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('②', '◉', '²', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('③', '◉', '³', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('④', '◉', '⁴', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('⑤', '◉', '⁵', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('⑥', '◉', '⁶', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('⑦', '◉', '⁷', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('⑧', '◉', '⁸', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('⑨', '◉', '⁹', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('⓪', '◉', '⁰', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('⊖', '◉', '⁻', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('⊕', '◉', '⁺', srcMask, bounds, '', 'center', 'center', bitXor);

        if (packFontCombine('Ⓡ', '■', '⒭', srcMask, bounds, '', '', '', bitXor)) {
            packFontCombine('Ⓡ', 'Ⓡ', '◉', srcMask, bounds, '', '', '', bitXor)
        }

        packFontCombine('ⓐ', '◉', 'ᵃ', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('ⓓ', '◉', 'ᵈ', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('ⓔ', '◉', 'ᵉ', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('ⓜ', '◉', 'ᵐ', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('ⓝ', '◉', 'ⁿ', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('Ⓞ', '◉', 'ᵒ', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('ⓧ', '◉', 'ˣ', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('ⓨ', '◉', 'ʸ', srcMask, bounds, '', 'center', 'center', bitXor);
        packFontCombine('ⓩ', '◉', 'ᶻ', srcMask, bounds, '', 'center', 'center', bitXor);
        
        // See if the bounds must be recomputed
        for (let c in bounds) {
            if (bounds[c].generated) {
                [tightY1, tightY2, _charWidth] = computeAllFontCharacterBounds(srcMask, char_size, bounds);
                break;
            }
        }
    }
    

    // Compute fixed-width number spacing
    let digitWidth = 0;
    for (let i = 0; i <= 9; ++i) {
        digitWidth = Math.max(digitWidth, bounds['' + i].x2 - bounds['' + i].x1 + 1);
    }
    
    // Compute line spacing
    {
        // Use ascenders and descenders from these letters
        const measureLetters = 'gjypqQ7zAIPlt';
        let yMin = Infinity, yMax = -Infinity;
        for (let i = 0; i < measureLetters.length; ++i) {
            const b = bounds[measureLetters[i]];
            const baseY = Math.floor(b.y1 / char_size.y) * char_size.y;
            yMin = Math.min(yMin, b.y1 - baseY);
            yMax = Math.max(yMax, b.y2 - baseY);
        }
        font.line_height = yMax - yMin + 1 + spacing.y;
    }

    // Char width/height is the extent of each character's box in the
    // packed, padded image.  Allocate the final bitmap, including
    // padding for individual fonts.
    _charWidth += 2 * borderSize;
    font.$charWidth = _charWidth;
    font.$charHeight = (tightY2 - tightY1 + 1) + 2 * borderSize + shadowSize;
    font.glyph_size = Object.freeze({
        x: font.$charWidth - 2 * borderSize,
        y: font.$charHeight - 2 * borderSize - shadowSize});
    
    // Baseline is the distance from the top of each box to the text
    // baseline.  Adjust the baseline for the new tight packing and
    // the border padding.
    font.$baseline = baseline - tightY1 + borderSize;

    // Extract each character. Masks are 4x wider than character width to
    // handle the wide chars as well. These all store 0 or 255 values. They
    // are combined into a single bitmask at the end.
    const colorMask        = array2DUint8(_charWidth * 4, font.$charHeight);
    const borderMask       = array2DUint8(_charWidth * 4, font.$charHeight);
    const shadowMask       = array2DUint8(_charWidth * 4, font.$charHeight);
    const shadowBorderMask = array2DUint8(_charWidth * 4, font.$charHeight);
    // Have to save the font size for postMessage, which cannot preserve
    // extended properties on typed arrays.
    font.$size = {x: _charWidth * FONT_COLS, y: font.$charHeight * FONT_ROWS};
    font.$data = array2DUint8(_charWidth * FONT_COLS, font.$charHeight * FONT_ROWS);
    font.$bounds = {};

    for (let charY = 0; charY < FONT_ROWS; ++charY) {
        const charScale = (charY < FONT_ROWS - 2) ? 1 : 4;
        for (let charX = 0; charX < FONT_COLS / charScale; ++charX) {
            // Reset
            array2DClear(colorMask, 0);
            array2DClear(borderMask, 0);
            array2DClear(shadowMask, 0);
            array2DClear(shadowBorderMask, 0);
            
            // +1 for the newline on each row.
            // Als take into account that the last two rows are short.
            const index = charX +
                  Math.min(charY, FONT_ROWS - 2) * (FONT_COLS + 1) +
                  Math.max(charY - (FONT_ROWS - 2), 0) * (FONT_COLS / 4 + 1);
            const chr = fontChars[index];
            console.assert(chr !== undefined, 'Undefined character at (' + charX + ', ' + charY + ')');
            
            if (chr !== ' ') {
                const srcBounds = bounds[chr];
                ////////////////////////////////////////////////////////////////
                // Extract the colorMask bits, offsetting appropriately
                console.assert(srcBounds.y2 - srcBounds.y1 + 1 <= colorMask.height);
                console.assert(srcBounds.x2 - srcBounds.x1 + 1 <= colorMask.width);
                console.assert(char_size.y * charY === Math.floor(srcBounds.y1 / char_size.y) * char_size.y);

                if (! srcBounds.empty) {
                    array2DSetRect(colorMask,
                                   srcBounds.x1 - srcBounds.x1 + borderSize,
                                   srcBounds.y1 - char_size.y * charY - tightY1 + borderSize,
                                   srcMask,
                                   srcBounds.x1, srcBounds.y1,
                                   srcBounds.x2 - srcBounds.x1 + 1,
                                   srcBounds.y2 - srcBounds.y1 + 1);
                }
                /*
                // For testing
                if (chr === '%') {
                    console.log(srcBounds);
                    console.log(colorMask);
                    array2DPrint(colorMask);
                }*/
                
                if (borderSize > 0) {
                    // Compute the borderMask from the colorMask 8-ring
                    makeBorderMask(colorMask, borderMask);
                }

                if (shadowSize > 0) {
                    // Compute the shadowMask from the colorMask
                    array2DMapSet(shadowMask, function(x, y) {
                        if (array2DGet(colorMask, x, y)) { return 0; }
                        for (let s = 1; s <= shadowSize; ++s) if (array2DGet(colorMask, x, y - s)) return 255;
                        return 0;
                    });

                    // Compute the shadowBorderMask from the colorMask
                    array2DMapSet(shadowBorderMask, function(x, y) {
                        if (array2DGet(borderMask, x, y)) { return 0; }
                        for (let s = 1; s <= shadowSize; ++s) if (array2DGet(borderMask, x, y - s)) return 255;
                        return 0;
                    });
                }
                
                ////////////////////////////////////////////////////////////////
                // Write to the packed bitmap
                console.assert(font.$charHeight === colorMask.height);

                // For testing
                //if (chr === 'ⓥ') { console.log(font, _charWidth); array2DPrint(colorMask); }
                
                for (let srcY = 0; srcY < font.$charHeight; ++srcY) {
                    //let tst = ''; // For testing
                    const dstY = font.$charHeight * charY + srcY;

                    for (let srcX = 0; srcX < _charWidth * charScale; ++srcX) {
                        const dstX = _charWidth * charScale * charX + srcX;
                        
                        const m  = array2DGet(colorMask, srcX, srcY);
                        const b  = array2DGet(borderMask, srcX, srcY);
                        const s  = array2DGet(shadowMask, srcX, srcY);
                        const sb = array2DGet(shadowBorderMask, srcX, srcY);
                            
                        // bits are: s+b | s | b | m
                        let mask = 0x0;
                        if (m) {
                            mask = 0x1;
                        } else {
                            if (b) { mask |= 0x2; }
                            if (s) { mask |= 0x4; }
                            if (sb) { mask |= 0x8; }
                        }
                        
                        //if (chr === '∫') { tst += (mask < 10 ? '0' : '') + mask + ' '; } // For testing
                        array2DSet(font.$data, dstX, dstY, mask);
                    } // srcX

                    //if (chr === '∫') { console.log(tst); }  // For testing
                } // srcY
                //if (chr === '%') { console.log(font); array2DPrint(font.$data, _charWidth * charScale * charX, font.$charHeight * charY, _charWidth * charScale, font.$charHeight); }
                
                // Compute the bounds of this character as an absolute position on the final image
                const tileX = _charWidth * charX * charScale, tileY = font.$charHeight * charY, srcTileY = char_size.y * charY;

                // Enforce padding for fixed width characters
                const min_width = Math.max(char_min_width, isDigit(chr) ? digitWidth : 0);
                
                let pre = 0, post = 0;
                if (min_width > 0) {
                    // If this is a digit, shift the pixels and x
                    // bounds based on the mandatory fixed digit width
                    // so that it is centered
                    const w = srcBounds.x2 - srcBounds.x1 + 1;
                    post = Math.max(Math.ceil((min_width - w) / 2) | 0, 0) | 0;
                    pre = Math.max(min_width - w - post, 0) | 0;
                }

                font.$bounds[chr] = {
                    x1: tileX,
                    x2: tileX + srcBounds.x2 - srcBounds.x1 + 2 * borderSize,
                    y1: tileY + (srcBounds.y1 - srcTileY - tightY1),
                    y2: tileY + (srcBounds.y2 - srcTileY - tightY1) + borderSize * 2 + shadowSize,
                    pre: pre,
                    post: post,
                    yOffset: 0
                };


                /* debugging
                if (chr === 'ⓥ') {
                    const b = font.$bounds[chr];
                    console.log(font, b);
                    array2DPrint(font.$data, b.x1, b.y1, b.x2 - b.x1 + 1, b.y2 - b.y1 + 1, false, 1);
                }
                */

            } // char !== ' '
            
        } // charX
    } // charY
    
    // Make bounds for the space and tab characters based on whichever
    // is larger of several thin characters.
    {
        const candidates = 'il¹;[|';
        let thickestBounds = null, thickestWidth = 0;
        for (let i = 0; i < candidates.length; ++i) {
            const c = candidates[i];
            const bounds = font.$bounds[c];
            const width = bounds.x2 - bounds.x1 + 1;
            if (width > thickestWidth) {
                thickestWidth = width;
                thickestBounds = bounds;
            }
        }
        font.$bounds[' '] = font.$bounds['\t'] = thickestBounds;
    }
        
    // Compute subscript bounds
    {
        const b = bounds['⁰'];
        const tileY = Math.floor(b.y1 / char_size.y) * char_size.y;
        const subscriptOffset = Math.floor(baseline + (b.y1 - b.y2) / 2);

        // Map a subscript to the corresponding superscript. Note that there
        // are OTHER superscripts that have no corresponding subscript.
        const subscript   = fontSubscriptChars;
        const superscript = '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁽⁾ᵃᵝᵉʰⁱʲᵏᵐⁿᵒʳˢᵗᵘˣ';
        for (let i = 0; i < subscript.length; ++i) {
            const sub = subscript[i];
            const sup = superscript[i];
            const b = Object.assign({}, font.$bounds[sup]);
            b.yOffset = subscriptOffset;
            font.$bounds[sub] = Object.freeze(b);
        }
    }
}