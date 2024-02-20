function isValidIdentifier(text, languageVersion = ts.ScriptTarget.Latest) {
        const scan = scanToken(text, languageVersion);
        return scan.isIdentifier() && scan.getTextPos() === text.length && scan.getTokenPos() === 0;
    }