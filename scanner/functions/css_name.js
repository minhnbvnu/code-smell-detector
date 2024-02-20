function css_name() {
        if (next_token.identifier) {
            advance();
            return true;
        }
    }