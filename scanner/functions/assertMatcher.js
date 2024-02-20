function assertMatcher(value) {
    if (!isMatcher(value)) {
        throw new TypeError("Matcher expected");
    }
}