function consumeOp(tokens, op) {
            var token;
            token = peek(tokens);
            if (token !== op) {
                throw new Error("Expected '" + op + "', got '" + token + "' instead.");
            }
            return tokens.shift();
        }