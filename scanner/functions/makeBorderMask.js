function makeBorderMask(srcMask, dstMask) {
    array2DMapSet(dstMask, function(x, y) {
        return (! array2DGet(srcMask, x, y) &&
                (array2DGet(srcMask, x - 1, y - 1) || array2DGet(srcMask, x, y - 1) || array2DGet(srcMask, x + 1, y - 1) ||
                 array2DGet(srcMask, x - 1, y) || array2DGet(srcMask, x + 1, y) ||
                 array2DGet(srcMask, x - 1, y + 1) || array2DGet(srcMask, x, y + 1) || array2DGet(srcMask, x + 1, y + 1))); });
}