function isPunctuatorTokenWithValue(token, value) {
        return token.type === "Punctuator" && token.value === value;
    }