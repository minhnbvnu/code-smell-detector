function do_jslint() {
        var name, value;
        while (next_token.id === '(string)' || next_token.identifier) {
            name = next_token.string;
            advance();
            if (next_token.id !== ':') {
                stop('expected_a_b', next_token, ':', artifact());
            }
            advance(':');
            switch (name) {
            case 'indent':
                value = next_token.number;
                if (!isFinite(value) || value < 0 || Math.floor(value) !== value) {
                    stop('expected_small_a');
                }
                option.indent = value;
                break;
            case 'maxerr':
                value = +next_token.string;
                value = next_token.number;
                if (!isFinite(value) || value <= 0 || Math.floor(value) !== value) {
                    stop('expected_small_a');
                }
                option.maxerr = value;
                break;
            case 'maxlen':
                value = next_token.number;
                if (!isFinite(value) || value <= 0 || Math.floor(value) !== value) {
                    stop('expected_small_a');
                }
                option.maxlen = value;
                break;
            default:
                if (next_token.id === 'true') {
                    option[name] = true;
                } else if (next_token.id === 'false') {
                    option[name] = false;
                } else {
                    stop('unexpected_a');
                }
                switch (name) {
                case 'adsafe':
                    option.adsafe = option.safe = true;
                    do_safe();
                    break;
                case 'safe':
                    do_safe();
                    break;
                }
            }
            advance();
            if (next_token.id === ',') {
                advance(',');
            }
        }
        assume();
    }