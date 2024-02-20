function isStringANonContextualKeyword(name) {
            const token = stringToToken(name);
            return token !== void 0 && isNonContextualKeyword(token);
        }