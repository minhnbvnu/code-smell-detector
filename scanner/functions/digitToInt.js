function digitToInt(code) {
        if (code >= LATIN_SMALL_LETTER_A && code <= LATIN_SMALL_LETTER_F) {
            return code - LATIN_SMALL_LETTER_A + 10;
        }
        if (code >= LATIN_CAPITAL_LETTER_A && code <= LATIN_CAPITAL_LETTER_F) {
            return code - LATIN_CAPITAL_LETTER_A + 10;
        }
        return code - DIGIT_ZERO;
    }