function do_properties() {
        var name, type;
        option.properties = true;
        if (!funct['(old_property_type)']) {
            funct['(old_property_type)'] = property_type;
            property_type = Object.create(property_type);
        }
        for (;;) {
            if (next_token.id !== '(string)' && !next_token.identifier) {
                return;
            }
            name = next_token.string;
            type = '';
            advance();
            if (next_token.id === ':') {
                advance(':');
                if (next_token.id === 'function') {
                    advance('function');
                    if (is_type[next_token.string] === true) {
                        type = 'function ' + next_token.string;
                        advance();
                    } else {
                        type = 'function';
                    }
                } else {
                    type = next_token.string;
                    if (is_type[type] !== true) {
                        warn('expected_type_a', next_token);
                        type = '';
                    }
                    advance();
                }
            }
            property_type[name] = type;
            if (next_token.id !== ',') {
                return;
            }
            advance(',');
        }
    }