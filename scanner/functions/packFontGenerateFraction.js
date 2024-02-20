function packFontGenerateFraction(dst, srcNumerator, srcDenominator, srcMask, bounds) {
    if (packFontCombine(dst, '/', srcNumerator, srcMask, bounds, '', '', 'left')) {
        packFontCombine(dst, dst, srcDenominator, srcMask, bounds, '', 'bottom', 'right');
    }
}