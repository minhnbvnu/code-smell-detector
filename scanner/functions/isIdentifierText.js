function isIdentifierText(name, languageVersion, identifierVariant) {
            let ch = codePointAt(name, 0);
            if (!isIdentifierStart(ch, languageVersion)) {
                return false;
            }
            for (let i = charSize(ch); i < name.length; i += charSize(ch)) {
                if (!isIdentifierPart(ch = codePointAt(name, i), languageVersion, identifierVariant)) {
                    return false;
                }
            }
            return true;
        }