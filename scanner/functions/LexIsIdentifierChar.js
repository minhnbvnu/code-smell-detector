function LexIsIdentifierChar(code) {
        return lexIdStartTable[code] || LexIsDigit(code);
    }