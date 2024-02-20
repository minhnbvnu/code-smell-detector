function SUM(array) {
    let s = 0;
    let i = array.length;
    while (i--) { s += array[i]; }
    return s;
}