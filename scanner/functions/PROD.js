function PROD(array) {
    let s = 1;
    let i = array.length;
    while (i--) { s *= array[i]; }
    return s;
}