function isUnicodeIdentifierPart(code, languageVersion) {
            return languageVersion >= 2 /* ES2015 */ ? lookupInUnicodeMap(code, unicodeESNextIdentifierPart) : languageVersion === 1 /* ES5 */ ? lookupInUnicodeMap(code, unicodeES5IdentifierPart) : lookupInUnicodeMap(code, unicodeES3IdentifierPart);
        }