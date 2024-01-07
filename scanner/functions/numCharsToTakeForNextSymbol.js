function numCharsToTakeForNextSymbol(string, index) {
    if (index === string.length - 1) {
        // Last character in the string, so we can only take 1
        return 1;
    }
    if (isCodeBetween(string[index], HIGH_SURROGATE_BEGIN, HIGH_SURROGATE_END)) {
        const first = string.substring(index, index + 2);
        const second = string.substring(index + 2, index + 4);

        // check if second character is fitzpatrick (color) modifier
        // or if this is a pair of regional indicators (a flag)
        if (isCodeBetween(second, FITZPATRICK_MODIFIER_BEGIN, FITZPATRICK_MODIFIER_END) ||
            (isCodeBetween(first, REGIONAL_INDICATOR_BEGIN, REGIONAL_INDICATOR_END) &&
            isCodeBetween(second, REGIONAL_INDICATOR_BEGIN, REGIONAL_INDICATOR_END))
        ) {
            return 4;
        }

        // check if next character is a modifier, in which case we should return it
        if (isCodeBetween(second, VARIATION_MODIFIER_BEGIN, VARIATION_MODIFIER_END)) {
            return 3;
        }

        // return surrogate pair
        return 2;
    }

    // check if next character is the emoji modifier, in which case we should include it
    if (isCodeBetween(string[index + 1], VARIATION_MODIFIER_BEGIN, VARIATION_MODIFIER_END)) {
        return 2;
    }

    // just a regular character
    return 1;
}