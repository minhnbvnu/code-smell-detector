function packFontGenerateAccent(dst, srcLetter, srcAccent, srcMask, bounds, shiftLetterY) {
    packFontCombine(dst, srcLetter, srcAccent, srcMask, bounds, shiftLetterY ? 'bottom' : '', 'top');
}