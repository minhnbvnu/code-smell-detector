function createLiteral(token) {
        return {
            type: Syntax.Literal,
            value: token.value
        };
    }