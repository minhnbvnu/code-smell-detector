function token_error(token, msg) {
                croak(msg, token.line, token.col);
            }