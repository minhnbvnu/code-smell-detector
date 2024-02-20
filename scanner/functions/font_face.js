function font_face() {
        advance_identifier('font-family');
        advance(':');
        if (!css_name() && !css_string()) {
            stop('expected_name_a');
        }
        semicolon();
        advance_identifier('src');
        advance(':');
        while (true) {
            if (next_token.string === 'local') {
                advance_identifier('local');
                advance('(');
                if (ux.test(next_token.string)) {
                    stop('bad_url_a');
                }

                if (!css_name() && !css_string()) {
                    stop('expected_name_a');
                }
                advance(')');
            } else if (!css_url()) {
                stop('expected_a_b', next_token, 'url', artifact());
            }
            if (next_token.id !== ',') {
                break;
            }
            comma();
        }
        semicolon();
    }