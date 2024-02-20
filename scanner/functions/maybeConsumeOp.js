function maybeConsumeOp(tokens, op) {
            var token;
            token = tokens[0];
            if (token === op) {
                return tokens.shift();
            }
            else {
                return null;
            }
        }