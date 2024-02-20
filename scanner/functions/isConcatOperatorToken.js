function isConcatOperatorToken(token) {
        return token.value === "+" && token.type === "Punctuator";
    }