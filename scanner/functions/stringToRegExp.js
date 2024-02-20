function stringToRegExp(string, flags) {
    try {
        return new RegExp(string, flags);
    } catch (e) { return string; }
}