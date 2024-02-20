function get_token(offset) {
            var index = token_pos + (offset || 0);
            return (index < 0 || index >= tokens.length) ? null : tokens[index];
        }