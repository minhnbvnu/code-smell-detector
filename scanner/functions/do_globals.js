function do_globals() {
        var name, writeable;
        for (;;) {
            if (next_token.id !== '(string)' && !next_token.identifier) {
                return;
            }
            name = next_token.string;
            advance();
            writeable = false;
            if (next_token.id === ':') {
                advance(':');
                switch (next_token.id) {
                case 'true':
                    writeable = predefined[name] !== false;
                    advance('true');
                    break;
                case 'false':
                    advance('false');
                    break;
                default:
                    stop('unexpected_a');
                }
            }
            predefined[name] = writeable;
            if (next_token.id !== ',') {
                return;
            }
            advance(',');
        }
    }