function MSColorToHEX8(mscolor) {
    return "#" + mscolor.immutableModelObject().hexValue() + Math.round(mscolor.alpha() * 255).toString(16).toUpperCase();
}