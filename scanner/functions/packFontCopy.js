function packFontCopy(dst, srcA, srcMask, bounds, xSign = 1, ySign = 1) {
    console.assert(Math.abs(ySign) == 1);
    console.assert(Math.abs(xSign) == 1);
    let dstBounds = bounds[dst];
    const srcABounds = bounds[srcA];

    // Used for visualizations
    fontCharCanBeGenerated[dst] = true;
    
    // Nothing to do if the source does not exist or the destination
    // already exists
    if (! dstBounds.empty || srcABounds.empty) { return false; }
    
    // Copy the base letter
    if (xSign === 1 && ySign === 1) {
        array2DSetRect(srcMask, dstBounds.srcX, dstBounds.srcY, srcMask, srcABounds.srcX, srcABounds.srcY, srcABounds.srcWidth, srcABounds.srcHeight);
    } else {
        // Flips

        const distanceFromTop = srcABounds.y1 - srcABounds.srcY;
        const distanceFromBottom = srcABounds.srcY + srcABounds.srcHeight - 1 - srcABounds.y2;
        const dstShiftY = (ySign < 0) ?
              (srcABounds.srcHeight - 1 + distanceFromTop - distanceFromBottom) :
              0;
        for (let y = 0; y < srcABounds.srcHeight; ++y) {
            const srcY = srcABounds.srcY + y, dstY = dstBounds.srcY + y * ySign + dstShiftY;
            for (let x = 0; x < srcABounds.srcWidth; ++x) {
                const srcX = srcABounds.srcX + x, dstX = dstBounds.srcX + x * xSign + ((xSign < 0) ? (srcABounds.srcWidth - 1) : 0);
                const s = array2DGet(srcMask, srcX, srcY);
                array2DSet(srcMask, dstX, dstY, s);
            } // x
        } // y
    }

    // Flag as generated
    dstBounds.generated = true;
    dstBounds.empty = false;

    dstBounds = computeFontSingleCharacterBounds(srcMask, {x:dstBounds.srcWidth, y:dstBounds.srcHeight}, bounds, dst);
    return true;
}