function json_object() {
            var brace = next_token, object = {};
            advance('{');
            if (next_token.id !== '}') {
                while (next_token.id !== '(end)') {
                    while (next_token.id === ',') {
                        warn('unexpected_a', next_token);
                        advance(',');
                    }
                    if (next_token.id !== '(string)') {
                        warn('expected_string_a');
                    }
                    if (object[next_token.string] === true) {
                        warn('duplicate_a');
                    } else if (next_token.string === '__proto__') {
                        warn('dangling_a');
                    } else {
                        object[next_token.string] = true;
                    }
                    advance();
                    advance(':');
                    json_value();
                    if (next_token.id !== ',') {
                        break;
                    }
                    advance(',');
                    if (next_token.id === '}') {
                        warn('unexpected_a', token);
                        break;
                    }
                }
            }
            advance('}', brace);
        }