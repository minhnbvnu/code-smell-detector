function packFontErode(dst, src, srcMask, bounds) {
    let dstBounds = bounds[dst];
    const srcBounds = bounds[src];

    // Used for visualizations
    fontCharCanBeGenerated[dst] = true;
    
    // Nothing to do if the source does not exist or the destination
    // already exists
    if (! dstBounds.empty || srcBounds.empty) { return false; }
    
    const distanceFromTop = srcBounds.y1 - srcBounds.srcY;
    const distanceFromBottom = srcBounds.srcY + srcBounds.srcHeight - 1 - srcBounds.y2;

    for (let y = 0; y < srcBounds.srcHeight; ++y) {
        const srcY = srcBounds.srcY + y, dstY = dstBounds.srcY + y;
        for (let x = 0; x < srcBounds.srcWidth; ++x) {
            const srcX = srcBounds.srcX + x, dstX = dstBounds.srcX + x;

            // Copy each pixel unless all of its 4-ring neighbors are
            // in bounds and all white.
            if (x === 0 || y === 0 || x === srcBounds.srcWidth - 1 || y === srcBounds.srcHeight - 1 ||
                ! array2DGet(srcMask, srcX - 1, srcY) ||
                ! array2DGet(srcMask, srcX + 1, srcY) ||
                ! array2DGet(srcMask, srcX, srcY - 1) ||
                ! array2DGet(srcMask, srcX, srcY + 1)) {
                const s = array2DGet(srcMask, srcX, srcY);
                array2DSet(srcMask, dstX, dstY, s);
            }
        } // x
    } // y

    // Flag as generated
    dstBounds.generated = true;
    dstBounds.empty = false;

    dstBounds = computeFontSingleCharacterBounds(srcMask, {x:dstBounds.srcWidth, y:dstBounds.srcHeight}, bounds, dst);
    return true;
}