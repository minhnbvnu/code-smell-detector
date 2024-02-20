function _translate_token(token, tokenMap) {
    if (token.match(/[0-9]+(\.[0-9]+)?/)) {
        return parseFloat(token);
    }

    if (tokenMap.has(token)) {
        return tokenMap.get(token);
    }

    throw new DetailedError("Unrecognized token", {token});
}