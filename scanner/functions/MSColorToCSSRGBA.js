function MSColorToCSSRGBA(mscolor) {
    var alpha = Math.floor(mscolor.alpha()) < mscolor.alpha() ? mscolor.alpha().toFixed(2) : Math.round(mscolor.alpha());
    return "rgba(" + Math.round(mscolor.red() * 255) + ", " +
        Math.round(mscolor.green() * 255) + ", " +
        Math.round(mscolor.blue() * 255) + ", " +
        alpha + ")";
}