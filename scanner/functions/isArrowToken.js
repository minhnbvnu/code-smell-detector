function isArrowToken(token) {
        return token.value === "=>" && token.type === "Punctuator";
    }