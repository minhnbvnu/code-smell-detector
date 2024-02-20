function quotePreferenceFromString(str, sourceFile) {
            return isStringDoubleQuoted(str, sourceFile) ? 1 /* Double */ : 0 /* Single */;
        }