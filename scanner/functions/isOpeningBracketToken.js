function isOpeningBracketToken(token) {
        return token.value === "[" && token.type === "Punctuator";
    }