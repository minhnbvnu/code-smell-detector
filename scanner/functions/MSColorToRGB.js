function MSColorToRGB(mscolor) {
    var alpha = mscolor.alpha() < 1 ? " a:" + Math.round(mscolor.alpha() * 100) + "%" : "";
    return "r:" + Math.round(mscolor.red() * 255) + " " +
        "g:" + Math.round(mscolor.green() * 255) + " " +
        "b:" + Math.round(mscolor.blue() * 255) +
        alpha;
}