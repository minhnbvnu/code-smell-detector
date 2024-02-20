function tokenRangeFromRange(from, to, except = []) {
            const tokens = [];
            for (let token = from; token <= to; token++) {
                if (!contains(except, token)) {
                    tokens.push(token);
                }
            }
            return tokenRangeFrom(tokens);
        }