function as_symbol(type, noerror) {
                if (!is("name")) {
                    if (!noerror)
                        croak("Name expected");
                    return null;
                }
                var sym = _make_symbol(type);
                _verify_symbol(sym);
                next();
                return sym;
            }