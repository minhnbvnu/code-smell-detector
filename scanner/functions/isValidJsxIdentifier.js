function isValidJsxIdentifier(text, languageVersion = ts.ScriptTarget.Latest) {
        if (text.length === 0)
            return false;
        let seenNamespaceSeparator = false;
        let ch = text.codePointAt(0);
        if (!ts.isIdentifierStart(ch, languageVersion))
            return false;
        for (let i = charSize(ch); i < text.length; i += charSize(ch)) {
            ch = text.codePointAt(i);
            if (!ts.isIdentifierPart(ch, languageVersion) && ch !== 45 /* minus */) {
                if (!seenNamespaceSeparator && ch === 58 /* colon */ && i + charSize(ch) !== text.length) {
                    seenNamespaceSeparator = true;
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }