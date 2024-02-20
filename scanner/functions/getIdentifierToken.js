function getIdentifierToken() {
                const len = tokenValue.length;
                if (len >= 2 && len <= 12) {
                    const ch = tokenValue.charCodeAt(0);
                    if (ch >= 97 /* a */ && ch <= 122 /* z */) {
                        const keyword = textToKeyword.get(tokenValue);
                        if (keyword !== void 0) {
                            return token = keyword;
                        }
                    }
                }
                return token = 79 /* Identifier */;
            }