function countRegexOccurences(string, regex) {
    return (string.match(regex) || []).length;
}