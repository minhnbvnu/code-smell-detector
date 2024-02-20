function captureAndAppend(str, reg, suffix) {
    const matches = str.match(reg);
    if (matches === null)
        throw new Error("no match in the given string");
    return str.replace(reg, matches[0] + suffix);
}