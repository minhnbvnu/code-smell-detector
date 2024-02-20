function isLatinLetter(code) {
        return ((code >= LATIN_CAPITAL_LETTER_A && code <= LATIN_CAPITAL_LETTER_Z) ||
            (code >= LATIN_SMALL_LETTER_A && code <= LATIN_SMALL_LETTER_Z));
    }