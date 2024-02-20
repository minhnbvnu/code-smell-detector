function toGLSLFloatString(num) {
    let str = "" + num;
    if (!str.includes("."))
        str += ".";
    return str;
}