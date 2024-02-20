function MSColorToCSSHSL(mscolor) {
    var hsl = RGBToHSL(mscolor.red(), mscolor.green(), mscolor.blue());
    return "hsl(" + hsl["0"] + ", " +
        hsl["1"] + "%, " +
        hsl["2"] + "%)";
}