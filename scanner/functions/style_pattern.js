function style_pattern() {
        if (next_token.id === '{') {
            warn('expected_style_pattern');
        }
        for (;;) {
            style_selector();
            if (next_token.id === '</' || next_token.id === '{' ||
                    next_token.id === '}' || next_token.id === '(end)') {
                return '';
            }
            if (next_token.id === ',') {
                comma();
            }
        }
    }