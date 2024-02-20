function isValidPropertyName(text, languageVersion = ts.ScriptTarget.Latest) {
        if (isValidPropertyAccess(text, languageVersion))
            return true;
        const scan = scanToken(text, languageVersion);
        return scan.getTextPos() === text.length &&
            scan.getToken() === ts.SyntaxKind.NumericLiteral && scan.getTokenValue() === text; // ensure stringified number equals literal
    }