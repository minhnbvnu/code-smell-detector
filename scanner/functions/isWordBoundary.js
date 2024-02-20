function isWordBoundary(char) {
    return char === undefined || isBlank(char) || isPunctuationCharacter(char);
}