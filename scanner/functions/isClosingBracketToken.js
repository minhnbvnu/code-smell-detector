function isClosingBracketToken(token) {
        return token.value === "]" && token.type === "Punctuator";
    }