function isJSXIdentifierStart(ch) {
        // exclude backslash (\)
        return (ch !== 92) && isIdentifierStart(ch);
    }