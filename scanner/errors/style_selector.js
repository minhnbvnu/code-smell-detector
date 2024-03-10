function style_selector() {
        if (next_token.identifier) {
            if (!Object.prototype.hasOwnProperty.call(html_tag, option.cap ?
                    next_token.string.toLowerCase() : next_token.string)) {
                warn('expected_tagname_a');
            }
            advance();
        } else {
            switch (next_token.id) {
            case '>':
            case '+':
                advance();
                style_selector();
                break;
            case ':':
                advance(':');
                switch (next_token.string) {
                case 'active':
                case 'after':
                case 'before':
                case 'checked':
                case 'disabled':
                case 'empty':
                case 'enabled':
                case 'first-child':
                case 'first-letter':
                case 'first-line':
                case 'first-of-type':
                case 'focus':
                case 'hover':
                case 'last-child':
                case 'last-of-type':
                case 'link':
                case 'only-of-type':
                case 'root':
                case 'target':
                case 'visited':
                    advance_identifier(next_token.string);
                    break;
                case 'lang':
                    advance_identifier('lang');
                    advance('(');
                    if (!next_token.identifier) {
                        warn('expected_lang_a');
                    }
                    advance(')');
                    break;
                case 'nth-child':
                case 'nth-last-child':
                case 'nth-last-of-type':
                case 'nth-of-type':
                    advance_identifier(next_token.string);
                    advance('(');
                    style_child();
                    advance(')');
                    break;
                case 'not':
                    advance_identifier('not');
                    advance('(');
                    if (next_token.id === ':' && peek(0).string === 'not') {
                        warn('not');
                    }
                    style_selector();
                    advance(')');
                    break;
                default:
                    warn('expected_pseudo_a');
                }
                break;
            case '#':
                advance('#');
                if (!next_token.identifier) {
                    warn('expected_id_a');
                }
                advance();
                break;
            case '*':
                advance('*');
                break;
            case '.':
                advance('.');
                if (!next_token.identifier) {
                    warn('expected_class_a');
                }
                advance();
                break;
            case '[':
                advance('[');
                if (!next_token.identifier) {
                    warn('expected_attribute_a');
                }
                advance();
                if (next_token.id === '=' || next_token.string === '~=' ||
                        next_token.string === '$=' ||
                        next_token.string === '|=' ||
                        next_token.id === '*=' ||
                        next_token.id === '^=') {
                    advance();
                    if (next_token.id !== '(string)') {
                        warn('expected_string_a');
                    }
                    advance();
                }
                advance(']');
                break;
            default:
                stop('expected_selector_a');
            }
        }
    }