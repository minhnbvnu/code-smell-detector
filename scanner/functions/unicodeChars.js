function unicodeChars(text) {
        return Array.from(text).map(function (c) { return c.codePointAt(0); });
    }