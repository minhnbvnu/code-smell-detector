function hasNConsecutiveBlankLines(string, n) {
    let pattern = `(\r?\n[ \t]*){${n},}\r?\n`;
    return new RegExp(pattern).test(string);
}