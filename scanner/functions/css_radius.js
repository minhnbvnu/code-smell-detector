function css_radius() {
        return css_length() && (next_token.id !== '(number)' || css_length());
    }