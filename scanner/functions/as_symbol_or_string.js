function as_symbol_or_string(type) {
                if (!is("name")) {
                    if (!is("string")) {
                        croak("Name or string expected");
                    }
                    var tok = S.token;
                    var ret = new type({
                        start: tok,
                        end: tok,
                        name: tok.value,
                        quote: tok.quote
                    });
                    next();
                    return ret;
                }
                var sym = _make_symbol(type);
                _verify_symbol(sym);
                next();
                return sym;
            }