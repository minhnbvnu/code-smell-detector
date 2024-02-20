function isStringAKeyword(name) {
            const token = stringToToken(name);
            return token !== void 0 && isKeyword(token);
        }