function maskColor(maskRed, maskGreen, maskBlue, maskAlpha) {
    const maskRedR = (~maskRed + 1) & maskRed;
    const maskGreenR = (~maskGreen + 1) & maskGreen;
    const maskBlueR = (~maskBlue + 1) & maskBlue;
    const maskAlphaR = (~maskAlpha + 1) & maskAlpha;
    const shiftedMaskRedL = maskRed / maskRedR + 1;
    const shiftedMaskGreenL = maskGreen / maskGreenR + 1;
    const shiftedMaskBlueL = maskBlue / maskBlueR + 1;
    const shiftedMaskAlphaL = maskAlpha / maskAlphaR + 1;
    return {
        shiftRed: (x) => (((x & maskRed) / maskRedR) * 0x100) / shiftedMaskRedL,
        shiftGreen: (x) => (((x & maskGreen) / maskGreenR) * 0x100) / shiftedMaskGreenL,
        shiftBlue: (x) => (((x & maskBlue) / maskBlueR) * 0x100) / shiftedMaskBlueL,
        shiftAlpha: maskAlpha !== 0
            ? (x) => (((x & maskAlpha) / maskAlphaR) * 0x100) / shiftedMaskAlphaL
            : () => 255
    };
}