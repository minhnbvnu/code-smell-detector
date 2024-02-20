function optional_identifier() {
        if (next_token.identifier) {
            advance();
            if (option.safe && banned[token.string]) {
                warn('adsafe_a', token);
            } else if (token.reserved && !option.es5) {
                warn('expected_identifier_a_reserved', token);
            }
            return token.string;
        }
    }