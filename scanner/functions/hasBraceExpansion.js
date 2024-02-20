function hasBraceExpansion(pattern) {
        const openingBraceIndex = pattern.indexOf('{');
        if (openingBraceIndex === -1) {
            return false;
        }
        const closingBraceIndex = pattern.indexOf('}', openingBraceIndex + 1);
        if (closingBraceIndex === -1) {
            return false;
        }
        const braceContent = pattern.slice(openingBraceIndex, closingBraceIndex);
        return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent);
    }