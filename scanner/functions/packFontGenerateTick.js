function packFontGenerateTick(dst, A, srcMask, bounds, yAlign = 'top') {
    packFontCombine(dst, A, "'", srcMask, bounds, '', yAlign, 'right');
}