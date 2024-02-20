function isNonContextualKeyword(token) {
            return isKeyword(token) && !isContextualKeyword(token);
        }