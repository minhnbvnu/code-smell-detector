function MSColorToHEX(mscolor) {
    var alpha = mscolor.alpha() < 1 ? " (alpha:" + Math.round(mscolor.alpha() * 100) + "%)" : "";
    return "#" + mscolor.immutableModelObject().hexValue() + alpha;
}