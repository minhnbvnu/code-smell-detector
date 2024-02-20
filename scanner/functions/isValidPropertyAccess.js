function isValidPropertyAccess(text, languageVersion = ts.ScriptTarget.Latest) {
        if (text.length === 0)
            return false;
        let ch = text.codePointAt(0);
        if (!ts.isIdentifierStart(ch, languageVersion))
            return false;
        for (let i = charSize(ch); i < text.length; i += charSize(ch)) {
            ch = text.codePointAt(i);
            if (!ts.isIdentifierPart(ch, languageVersion))
                return false;
        }
        return true;
    }