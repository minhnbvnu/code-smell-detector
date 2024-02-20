function MSColorToAndroid(mscolor) {
    return "#" + Math.round(mscolor.alpha() * 255).toString(16).toUpperCase() + mscolor.immutableModelObject().hexValue();
}