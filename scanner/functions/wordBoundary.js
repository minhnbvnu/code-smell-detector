function wordBoundary(c) {
        if (/\w/.test(c) || options.regExp) return "\\b";
        return "";
    }