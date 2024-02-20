function MSColorToCSSHSLA(mscolor) {
    var hsl = RGBToHSL(mscolor.red(), mscolor.green(), mscolor.blue());
    var alpha = Math.floor(mscolor.alpha()) < mscolor.alpha() ? mscolor.alpha().toFixed(2) : Math.round(mscolor.alpha());
    return "hsla(" + hsl["0"] + ", " +
        hsl["1"] + "%, " +
        hsl["2"] + "%, " +
        alpha + ")";
}