function as_atom_node() {
                var tok = S.token, ret;
                switch (tok.type) {
                    case "name":
                        ret = _make_symbol(AST_SymbolRef);
                        break;
                    case "num":
                        ret = new AST_Number({
                            start: tok,
                            end: tok,
                            value: tok.value,
                            raw: LATEST_RAW
                        });
                        break;
                    case "big_int":
                        ret = new AST_BigInt({ start: tok, end: tok, value: tok.value });
                        break;
                    case "string":
                        ret = new AST_String({
                            start: tok,
                            end: tok,
                            value: tok.value,
                            quote: tok.quote
                        });
                        break;
                    case "regexp":
                        const [_, source, flags] = tok.value.match(/^\/(.*)\/(\w*)$/);
                        ret = new AST_RegExp({ start: tok, end: tok, value: { source, flags } });
                        break;
                    case "atom":
                        switch (tok.value) {
                            case "false":
                                ret = new AST_False({ start: tok, end: tok });
                                break;
                            case "true":
                                ret = new AST_True({ start: tok, end: tok });
                                break;
                            case "null":
                                ret = new AST_Null({ start: tok, end: tok });
                                break;
                        }
                        break;
                }
                next();
                return ret;
            }