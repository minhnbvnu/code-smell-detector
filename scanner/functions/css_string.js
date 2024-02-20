function css_string() {
        if (next_token.id === '(string)') {
            advance();
            return true;
        }
    }