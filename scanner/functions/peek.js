function peek(tokens) {
            var token;
            token = tokens[0];
            if (token == null) {
                throw new Error('Unexpected end of input.');
            }
            return token;
        }