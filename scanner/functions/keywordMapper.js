function keywordMapper(value) {
        if (value.slice(-3) == "__c") return "support.function";
        return mainKeywordMapper(value);
    }