function css_width() {
        if (next_token.identifier) {
            switch (next_token.string) {
            case 'thin':
            case 'medium':
            case 'thick':
                advance();
                return true;
            }
        } else {
            return css_length();
        }
    }