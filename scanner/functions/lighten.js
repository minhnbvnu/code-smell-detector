function lighten(col, amt) {
    amt = Math.abs(amt);
    amt = amt / 100;
    return colorLuminance(col, amt);
}