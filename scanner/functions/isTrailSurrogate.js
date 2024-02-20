function isTrailSurrogate(code) {
        return code >= 0xdc00 && code <= 0xdfff;
    }