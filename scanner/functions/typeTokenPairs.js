function typeTokenPairs(type, tokens) {
        return "[" + type + " " + tokens.join("] [" + type + " ") + "]";
    }