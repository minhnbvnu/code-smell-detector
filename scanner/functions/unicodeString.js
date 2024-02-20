function unicodeString(data) {
        return String.fromCodePoint.apply(String, __spreadArray([], __read(data), false));
    }