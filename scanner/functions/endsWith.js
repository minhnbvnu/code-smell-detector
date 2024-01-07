function endsWith(str, suffix) {
    const l = str.length - suffix.length;
    return l >= 0 && str.indexOf(suffix, l) === l;
}