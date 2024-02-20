function createTokenRange(pos, token) {
            return createRange(pos, pos + tokenToString(token).length);
        }