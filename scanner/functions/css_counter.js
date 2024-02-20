function css_counter() {
        if (next_token.identifier && next_token.string === 'counter') {
            advance();
            advance('(');
            advance();
            if (next_token.id === ',') {
                comma();
                if (next_token.id !== '(string)') {
                    warn('expected_string_a');
                }
                advance();
            }
            advance(')');
            return true;
        }
        if (next_token.identifier && next_token.string === 'counters') {
            advance();
            advance('(');
            if (!next_token.identifier) {
                warn('expected_name_a');
            }
            advance();
            if (next_token.id === ',') {
                comma();
                if (next_token.id !== '(string)') {
                    warn('expected_string_a');
                }
                advance();
            }
            if (next_token.id === ',') {
                comma();
                if (next_token.id !== '(string)') {
                    warn('expected_string_a');
                }
                advance();
            }
            advance(')');
            return true;
        }
        return false;
    }