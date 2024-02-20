function countOccurrences(string, subString, allowOverlapping) {
    let n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else {
            break;
        }
    }
    
    return n;
}