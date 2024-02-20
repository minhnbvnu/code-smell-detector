function style_child() {
        if (next_token.id === '(number)') {
            advance();
            if (next_token.string === 'n' && next_token.identifier) {
                no_space_only();
                advance();
                if (next_token.id === '+') {
                    no_space_only();
                    advance('+');
                    no_space_only();
                    advance('(number)');
                }
            }
            return;
        } else {
            if (next_token.identifier &&
                    (next_token.string === 'odd' || next_token.string === 'even')) {
                advance();
                return;
            }
        }
        warn('unexpected_a');
    }