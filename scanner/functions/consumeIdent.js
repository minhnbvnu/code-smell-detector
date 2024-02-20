function consumeIdent(tokens) {
            var token;
            token = peek(tokens);
            if (!identifierRegex.test(token)) {
                throw new Error("Expected text, got '" + token + "' instead.");
            }
            return tokens.shift();
        }