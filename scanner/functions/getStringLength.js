function getStringLength(value) {
        if (isASCII(value)) {
            return value.length;
        }
        splitter !== null && splitter !== void 0 ? splitter : (splitter = new grapheme_splitter_1.default());
        return splitter.countGraphemes(value);
    }