function styles() {
        var i;
        while (next_token.id === '@') {
            i = peek();
            advance('@');
            switch (next_token.string) {
            case 'import':
                advance_identifier('import');
                if (!css_url()) {
                    warn('expected_a_b',
                        next_token, 'url', artifact());
                    advance();
                }
                semicolon();
                break;
            case 'media':
                advance_identifier('media');
                for (;;) {
                    if (!next_token.identifier || css_media[next_token.string] !== true) {
                        stop('expected_media_a');
                    }
                    advance();
                    if (next_token.id !== ',') {
                        break;
                    }
                    comma();
                }
                advance('{');
                style_list();
                advance('}');
                break;
            case 'font-face':
                advance_identifier('font-face');
                advance('{');
                font_face();
                advance('}');
                break;
            default:
                stop('expected_at_a');
            }
        }
        style_list();
    }