function isUnicodeIdentifierStart(code, languageVersion) {
            return languageVersion >= 2 /* ES2015 */ ? lookupInUnicodeMap(code, unicodeESNextIdentifierStart) : languageVersion === 1 /* ES5 */ ? lookupInUnicodeMap(code, unicodeES5IdentifierStart) : lookupInUnicodeMap(code, unicodeES3IdentifierStart);
        }