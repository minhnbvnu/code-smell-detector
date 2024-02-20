function unexpected(token) {
                if (token == null)
                    token = S.token;
                token_error(token, "Unexpected token: " + token.type + " (" + token.value + ")");
            }