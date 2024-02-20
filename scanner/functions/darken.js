function darken(col, amt) {
    amt = Math.abs(amt);
    amt = (amt / 100) * -1;
    return colorLuminance(col, amt);
}