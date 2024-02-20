function css_comma_list() {
        while (next_token.id !== ';') {
            if (!css_name() && !css_string()) {
                warn('expected_name_a');
            }
            if (next_token.id !== ',') {
                return true;
            }
            comma();
        }
    }