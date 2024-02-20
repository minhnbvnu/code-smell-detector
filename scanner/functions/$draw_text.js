function $draw_text(offsetIndex, formatIndex, str, formatArray, pos, z_pos, x_align, y_align, z_order, wrap_width, text_size, referenceFont) {
    $console.assert(typeof str === 'string');
    $console.assert(Array.isArray(formatArray));
    $console.assert(formatIndex < formatArray.length);
    $console.assert(typeof pos === 'object' && pos.x !== undefined);

    let format;
    if ((offsetIndex < formatArray[formatIndex].startIndex) ||
        (offsetIndex > formatArray[formatIndex].endIndex)) {
        // Empty, just return newline
        return {size: {x:0, y:referenceFont.$charHeight}}; // TODO: pos
    }
    
    // Identify the starting format. This snippet is repeated throughout the function.
    while ((offsetIndex < formatArray[formatIndex].startIndex) || (offsetIndex > formatArray[formatIndex].endIndex)) { ++formatIndex; }
    format = formatArray[formatIndex];

    // Store this starting formatIndex
    const startingOffsetIndex = offsetIndex;
    const startingFormatIndex = formatIndex;

    // Compute the width of the string for alignment purposes,
    // terminating abruptly in a recursive call if word wrapping is
    // required.
    let width = 0, currentWidth = 0;
    for (let c = 0; c < str.length; ++c, ++offsetIndex) {
        if (str[c] === '\n') {
            // Newline, process by breaking and recursively continuing
            const cur = str.substring(0, c).trimEnd();
            const firstLineBounds = $draw_text(startingOffsetIndex, startingFormatIndex, cur, formatArray, pos, z_pos, x_align, y_align, z_order, wrap_width, text_size, referenceFont);

            ++offsetIndex;
            // Update formatIndex if needed as well
            while ((offsetIndex < formatArray[formatIndex].startIndex) ||
                   (offsetIndex > formatArray[formatIndex].endIndex)) {
                ++formatIndex;
                
                if (formatIndex >= formatArray.length) {
                    // Nothing left
                    return firstLineBounds;
                }
            }

            $console.assert(formatIndex < formatArray.length);

            const restBounds = $draw_text(
                offsetIndex, formatIndex, str.substring(c + 1),
                formatArray, {x:pos.x, y:pos.y + referenceFont.line_height / $scaleY},
                z_pos, x_align, y_align, z_order, wrap_width, text_size - c - 1, referenceFont);
            // TODO: pos
            firstLineBounds.size.x = $Math.max(firstLineBounds.size.x, restBounds.size.x);
            if (restBounds.size.y > 0) {
                firstLineBounds.size.y += referenceFont.spacing.y + restBounds.size.y;
            }
            return firstLineBounds;
        }
        
        const chr = $fontMap[str[c]] || ' ';
        const bounds = format.font.$bounds[chr];

        const delta = (bounds.x2 - bounds.x1 + 1) + $postGlyphSpace(chr + ($fontMap[str[c + 1]] || ''), format.font) - format.font.$borderSize * 2 + bounds.pre + bounds.post;
        currentWidth += delta;
        width += delta;

        // Word wrapping
        if ((wrap_width !== undefined) && (wrap_width > 0) && (width > wrap_width - format.font.spacing.x)) {
            // Perform word wrap, we've exceeded the available width
            // Search backwards for a place to break.
            const breakChars = ' \n\t,.!:/\\)]}\'"|`-+=*…\?¿¡';

            // Avoid breaking more than 25% back along the string
            const maxBreakSearch = $Math.max(1, (c * 0.25) | 0);
            let breakIndex = -1;
            for (let i = 0; (breakIndex < maxBreakSearch) && (i < breakChars.length); ++i) {
                breakIndex = $Math.max(breakIndex, str.lastIndexOf(breakChars[i], c));
            }
            
            if ((breakIndex > c) || (breakIndex < maxBreakSearch)) {
                // Give up and break at c
                breakIndex = c;
            }

            const cur = str.substring(0, breakIndex);          
            const firstLineBounds = $draw_text(startingOffsetIndex, startingFormatIndex, cur.trimEnd(), formatArray, pos, z_pos, x_align, y_align, z_order, undefined, text_size, referenceFont);
            
            // Now draw the rest
            const next = str.substring(breakIndex);
            const nnext = next.trimStart();

            // Update the offset and formatIndex for the recursive call. Note that
            // we have to account for the extra whitespace trimmed from nnext
            offsetIndex = startingOffsetIndex + breakIndex + (next.length - nnext.length);

            // Search for the appropriate formatIndex
            formatIndex = startingFormatIndex;
            while ((offsetIndex < formatArray[formatIndex].startIndex) || (offsetIndex > formatArray[formatIndex].endIndex)) { ++formatIndex; }
            format = undefined;

            $console.assert(offsetIndex >= formatArray[formatIndex].startIndex && offsetIndex <= formatArray[formatIndex].endIndex);
            const restBounds = $draw_text(offsetIndex, formatIndex, nnext, formatArray, {x:pos.x, y:pos.y + referenceFont.line_height / $scaleY}, z_pos,
                                          x_align, y_align, z_order, wrap_width, text_size - cur.length - (next.length - nnext.length), referenceFont);

            // TODO: pos
            firstLineBounds.size.x = $Math.max(firstLineBounds.size.x, restBounds.size.x);
            if (restBounds.size.y > 0) {
                firstLineBounds.size.y += referenceFont.spacing.y + restBounds.size.y;
            }
            return firstLineBounds;
        }
        
        if (offsetIndex === formatArray[formatIndex].endIndex) {
            // Advance to the next format
            format.width = currentWidth;
            currentWidth = 0;
            ++formatIndex;
            if (formatIndex < formatArray.length) {
                // Hold the final format when going off the end of the array
                format = formatArray[formatIndex];
            }
        }
    }

    // Don't add space after the very last letter
    width -= format.font.spacing.x;
    format.width -= format.font.spacing.x;

    const skx = (z_pos * $skewXZ), sky = (z_pos * $skewYZ);
    let x = (pos.x + skx) * $scaleX + $offsetX, y = (pos.y + sky) * $scaleY + $offsetY;
    z_pos = z_pos * $scaleZ + $offsetZ;
    z_order = z_order * $scaleZ + $offsetZ;

    const height = referenceFont.$charHeight;

    // Force alignment to retain relative integer pixel alignment.
    // The - 0.4999 is to align with rectangle and disk centering rules.
    x = $Math.round(x - width * (1 + x_align) * 0.5);

    // Move back to account for the border and shadow padding
    if (typeof x_align === 'string') { throw 'bad x'; }
    if (x_align !== +1) { --x; }

    switch (y_align) {
    case -1: y -= referenceFont.$borderSize; break; // Align to the top of the bounds
    case  0:
        // Middle. Center on a '2', which tends to have a typical height 
        const bounds = referenceFont.$bounds['2'];
        const tileY = $Math.floor(bounds.y1 / referenceFont.$charHeight) * referenceFont.$charHeight;
        y -= $Math.round((bounds.y1 + bounds.y2) / 2) - tileY;
        break;
    case  1: y -= referenceFont.$baseline; break; // baseline
    case  2: y -= (referenceFont.$charHeight - referenceFont.$borderSize * 2 - referenceFont.$shadowSize); break; // bottom of bounds
    }


    // Center and round. Have to call round() because values may
    // be negative
    x = $Math.round(x) | 0;
    y = $Math.round(y) | 0;

    if ((x > $clipX2) || (x + width < $clipX1) ||
        (z_pos > $clipZ2 + 0.5) || (z_pos < $clipZ1 - 0.5) ||
        (y_align !== 2 && (y > $clipY2) || (y + height < $clipY1))) {
        // Cull when off-screen. Culling is disabled for "bottom" aligned
        // text because the implementation generatse a draw call and then
        // adjust the vertical position, so culling cannot happen during draw call
        // generation.
    } else {
        // Break by formatting and then re-traverse the formatting array.
        // Reset to the original formatIndex, since it was previously
        // incremented while traversing the string to compute width.
        offsetIndex = startingOffsetIndex;
        formatIndex = startingFormatIndex;
        format = formatArray[formatIndex];

        str = str.substring(0, text_size);

        while ((str.length > 0) && (formatIndex < formatArray.length)) {
            // offsetIndex increases and the string itself is
            // shortened throughout this loop.
    
            // Adjust for the baseline relative to the reference font
            const dy = format.font.$baseline - referenceFont.$baseline;

            const endIndex = format.endIndex - offsetIndex;

            let mappedStr = '';
            for (let i = 0; i <= endIndex; ++i) {
                mappedStr += $fontMap[str[i]] || ' ';
            }
            
            $addGraphicsCommand({
                opcode:  'TXT',
                str:     mappedStr,
                fontIndex: format.font.$index[0],
                x:       x,
                y:       y - dy,
                z:       z_order,
                color:   format.color,
                outline: format.outline,
                shadow:  format.shadow,
                height:  height,
                width:   format.width,
            });

            x += format.width;

            // Should adjust for the relative y baselines of the fonts,
            // changing the returned bounds accordingly

            offsetIndex = format.endIndex + 1;

            // Process the characters immediately after the end index.
            str = str.substring(endIndex + 1);
            
            ++formatIndex;
            format = formatArray[formatIndex];
        }
    }

    // The height in memory is inflated by 3 for the outline on top
    // and shadow and outline on the bottom. Return the tight
    // bound on the characters themselves.
    return {size: {x: width, y: height - 3}};
}