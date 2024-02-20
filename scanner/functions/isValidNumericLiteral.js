function isValidNumericLiteral(text, languageVersion = ts.ScriptTarget.Latest) {
        const scan = scanToken(text, languageVersion);
        return scan.getToken() === ts.SyntaxKind.NumericLiteral && scan.getTextPos() === text.length && scan.getTokenPos() === 0;
    }