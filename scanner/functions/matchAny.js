function matchAny(entry, patternsRe) {
        return patternsRe.some((patternRe) => patternRe.test(entry));
    }