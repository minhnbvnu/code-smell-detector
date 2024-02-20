function getAdjacentCommentTokensFromCursor(cursor) {
        const tokens = [];
        let currentToken = cursor.getOneToken();
        while (currentToken && isCommentToken(currentToken)) {
            tokens.push(currentToken);
            currentToken = cursor.getOneToken();
        }
        return tokens;
    }