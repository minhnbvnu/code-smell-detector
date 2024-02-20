function MSColorToNSColor(mscolor) {
    return "red:" + mscolor.red().toFixed(2) + " " +
        "green:" + mscolor.green().toFixed(2) + " " +
        "blue:" + mscolor.blue().toFixed(2) + " " +
        "alpha:" + mscolor.alpha().toFixed(2);
}