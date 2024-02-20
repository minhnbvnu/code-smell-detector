function array2DSetRect(dst,
                        dstX1,
                        dstY1,
                        src,
                        srcX1,
                        srcY1,
                        width,
                        height,
                        operation) {

    for (let y = 0; y < height; ++y) {
        const srcY = srcY1 + y, dstY = dstY1 + y;
        for (let x = 0; x < width; ++x) {
            const srcX = srcX1 + x, dstX = dstX1 + x;
            const s = array2DGet(src, srcX, srcY);
            let d;
            if (operation) {
                d = operation(array2DGet(dst, dstX, dstY), s);
            } else {
                d = s;
            }
            array2DSet(dst, dstX, dstY, d);
        } // x
    } // y
}