function createIndexMap(tokens, comments) {
        const map = Object.create(null);
        let tokenIndex = 0;
        let commentIndex = 0;
        let nextStart = 0;
        let range = null;
        while (tokenIndex < tokens.length || commentIndex < comments.length) {
            nextStart = (commentIndex < comments.length) ? comments[commentIndex].range[0] : Number.MAX_SAFE_INTEGER;
            while (tokenIndex < tokens.length && (range = tokens[tokenIndex].range)[0] < nextStart) {
                map[range[0]] = tokenIndex;
                map[range[1] - 1] = tokenIndex;
                tokenIndex += 1;
            }
            nextStart = (tokenIndex < tokens.length) ? tokens[tokenIndex].range[0] : Number.MAX_SAFE_INTEGER;
            while (commentIndex < comments.length && (range = comments[commentIndex].range)[0] < nextStart) {
                map[range[0]] = tokenIndex;
                map[range[1] - 1] = tokenIndex;
                commentIndex += 1;
            }
        }
        return map;
    }