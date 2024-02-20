function canUsePropertyAccess(name, languageVersion) {
            if (name.length === 0) {
                return false;
            }
            const firstChar = name.charCodeAt(0);
            return firstChar === 35 /* hash */ ? name.length > 1 && isIdentifierStart(name.charCodeAt(1), languageVersion) : isIdentifierStart(firstChar, languageVersion);
        }