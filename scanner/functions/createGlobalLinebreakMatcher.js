function createGlobalLinebreakMatcher() {
        return new RegExp(lineBreakPattern.source, "gu");
    }