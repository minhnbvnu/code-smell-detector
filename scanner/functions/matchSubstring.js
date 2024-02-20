function matchSubstring(code, begin, pattern) {
    return code.substr(begin, pattern.length) === pattern;
}