function isClosingBraceToken(token) {
        return token.value === "}" && token.type === "Punctuator";
    }