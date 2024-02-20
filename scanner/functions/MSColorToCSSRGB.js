function MSColorToCSSRGB(mscolor) {
    return "rgb(" + Math.round(mscolor.red() * 255) + ", " +
        Math.round(mscolor.green() * 255) + ", " +
        Math.round(mscolor.blue() * 255) + ")";
}