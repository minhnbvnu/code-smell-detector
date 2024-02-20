function addWordBoundary(needle, options) {
    function wordBoundary(c) {
        if (/\w/.test(c) || options.regExp) return "\\b";
        return "";
    }
    return wordBoundary(needle[0]) + needle
        + wordBoundary(needle[needle.length - 1]);
}