function hypot() {
    let y = 0;
    let i = arguments.length;
    while (i--) y += arguments[i] * arguments[i];
    return Math.sqrt(y);
}