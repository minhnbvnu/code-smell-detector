function isClosingParenToken(token) {
        return token.value === ")" && token.type === "Punctuator";
    }