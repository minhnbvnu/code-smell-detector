function verifyMatcher(possibleMatcher, arg) {
    var isMatcher = match.isMatcher(possibleMatcher);

    return (isMatcher && possibleMatcher.test(arg)) || true;
}