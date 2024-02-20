function params_or_seq_(allow_arrows, maybe_sequence) {
                var spread_token;
                var invalid_sequence;
                var trailing_comma;
                var a = [];
                expect("(");
                while (!is("punc", ")")) {
                    if (spread_token)
                        unexpected(spread_token);
                    if (is("expand", "...")) {
                        spread_token = S.token;
                        if (maybe_sequence)
                            invalid_sequence = S.token;
                        next();
                        a.push(new AST_Expansion({
                            start: prev(),
                            expression: expression(),
                            end: S.token,
                        }));
                    }
                    else {
                        a.push(expression());
                    }
                    if (!is("punc", ")")) {
                        expect(",");
                        if (is("punc", ")")) {
                            trailing_comma = prev();
                            if (maybe_sequence)
                                invalid_sequence = trailing_comma;
                        }
                    }
                }
                expect(")");
                if (allow_arrows && is("arrow", "=>")) {
                    if (spread_token && trailing_comma)
                        unexpected(trailing_comma);
                }
                else if (invalid_sequence) {
                    unexpected(invalid_sequence);
                }
                return a;
            }