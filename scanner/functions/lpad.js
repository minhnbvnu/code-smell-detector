function lpad(str, len) {
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}