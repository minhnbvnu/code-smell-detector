function packFontCombine(dst, srcA, srcB, srcMask, bounds, yAlignA, yAlignB, xAlignB, operation = bitOr) {
    // Used for visualizations
    fontCharCanBeGenerated[dst] = true;

    let dstBounds = bounds[dst];
    const srcABounds = bounds[srcA];

    // Nothing to do if the source does not exist or the destination
    // already exists. In the case where the destination is the same
    // as srcA allow execution--this is only used internally for
    // compositing
    if ((! dstBounds.empty && dst !== srcA) || srcABounds.empty) { return false; }

    // Perform the remapping. We use ` to make the calling code more
    // self documenting
    if (srcB === '`') { srcB = '‘'; }

    const srcBBounds = (srcB !== '') ? bounds[srcB] : undefined;

    // Copy the base letter
    if (dst !== srcA) {
        if (yAlignA === 'bottom') {
            const baseline = bounds['E'].y1 - bounds['E'].srcY;
            const yOffsetA = srcABounds.y1 - srcABounds.srcY - baseline;
            array2DSetRect(srcMask,
                           dstBounds.srcX,
                           dstBounds.srcY + yOffsetA,
                           srcMask,
                           srcABounds.srcX,
                           srcABounds.y1,
                           srcABounds.srcWidth,
                           srcABounds.y2 - srcABounds.y1 + 1);
        } else {
            array2DSetRect(srcMask, dstBounds.srcX, dstBounds.srcY, srcMask, srcABounds.srcX, srcABounds.srcY, srcABounds.srcWidth, srcABounds.srcHeight);
        }
        
        // We *could* update the bounds mathematically, but it is easier
        // to just rescan
        dstBounds = computeFontSingleCharacterBounds(srcMask, {x:dstBounds.srcWidth, y:dstBounds.srcHeight}, bounds, dst);
        if (srcA == dst) {
            srcABounds = dstBounds;
        }
    }
    
    // Combine the detail
    if (srcBBounds) {
        // Center the accent
        let xOffsetB = 0;

        if (xAlignB === 'left') {
            xOffsetB = (srcABounds.x1 - srcABounds.srcX) - (srcBBounds.x1 - srcBBounds.srcX) 
        } else if (xAlignB === 'right') {
            // Align the right edges of A and B
            xOffsetB =
                (srcBBounds.srcX + srcBBounds.srcWidth - srcBBounds.x2 - 1) -
                (srcABounds.srcX + srcABounds.srcWidth - srcABounds.x2 - 1);
        } else if (xAlignB === 'after-jam' || xAlignB === 'after') {
            // Overlap the left edge of B with the right edge of A by 1 pixel
            xOffsetB =
                (srcABounds.srcX + srcABounds.srcWidth - srcABounds.x2) -
                (srcBBounds.x1 - srcBBounds.srcX);
            if (xAlignB === 'after') {
                xOffsetB -= 1;
            }
        } else { // Center
            xOffsetB = Math.floor(
                ((srcBBounds.srcWidth - 1) / 2 -
                 ((srcBBounds.x2 + srcBBounds.x1) / 2 - srcBBounds.srcX)) -
                    
                ((srcABounds.srcWidth - 1) / 2 -
                 ((srcABounds.x2 + srcABounds.x1) / 2 - srcABounds.srcX)));
        }
        // Do not offset out of the character box
        xOffsetB = Math.max(xOffsetB, srcBBounds.srcX - srcBBounds.x1);
        xOffsetB = Math.min(xOffsetB, srcBBounds.srcX + srcBBounds.srcWidth - 1- srcBBounds.x2);
    
        let yOffsetB = 0;

        const topA    = srcABounds.y1 - srcABounds.srcY;
        const bottomA = srcABounds.y2 - srcABounds.srcY;
        const topB    = srcBBounds.y1 - srcBBounds.srcY;
        const bottomB = srcBBounds.y2 - srcBBounds.srcY;
        
        if (yAlignB === 'top' || yAlignB === 'top-jam') {
            yOffsetB = topA - bottomB - (yAlignB === 'top-jam' ? 0 : 2);
        } else if (yAlignB === 'bottom') {
            yOffsetB = (srcABounds.y2 - srcABounds.srcY) - (srcBBounds.y2 - srcBBounds.srcY) + 2;
        } else if (yAlignB === 'center') {
            yOffsetB = Math.floor(((bottomA + bottomB) - (topA + topB)) / 2 +
                                  topB - topA);
        }
        
        // Do not offset out of the character box
        yOffsetB = Math.min(
            Math.max(-topB, yOffsetB),
            srcBBounds.srcHeight - (srcBBounds.y2 - srcBBounds.y1 + 1));

        // Because we're using OR, it is ok to copy excess black space
        array2DSetRect(srcMask, dstBounds.srcX + xOffsetB, dstBounds.srcY + yOffsetB, srcMask, srcBBounds.srcX, srcBBounds.srcY, srcBBounds.srcWidth, srcBBounds.srcHeight, operation);
        
        // We *could* update the bounds mathematically, but it is easier
        // to just rescan
        dstBounds = computeFontSingleCharacterBounds(srcMask, {x:dstBounds.srcWidth, y:dstBounds.srcHeight}, bounds, dst);
    }

    // Flag as generated
    dstBounds.generated = true;
    dstBounds.empty = false;

    return true;
}