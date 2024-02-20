function vardefs(no_in, kind) {
                var var_defs = [];
                var def;
                for (;;) {
                    var sym_type = kind === "var" ? AST_SymbolVar :
                        kind === "const" ? AST_SymbolConst :
                            kind === "let" ? AST_SymbolLet : null;
                    // var { a } = b
                    if (is("punc", "{") || is("punc", "[")) {
                        def = new AST_VarDef({
                            start: S.token,
                            name: binding_element(undefined, sym_type),
                            value: is("operator", "=") ? (expect_token("operator", "="), expression(false, no_in)) : null,
                            end: prev()
                        });
                    }
                    else {
                        def = new AST_VarDef({
                            start: S.token,
                            name: as_symbol(sym_type),
                            value: is("operator", "=")
                                ? (next(), expression(false, no_in))
                                : !no_in && kind === "const"
                                    ? croak("Missing initializer in const declaration") : null,
                            end: prev()
                        });
                        if (def.name.name == "import")
                            croak("Unexpected token: import");
                    }
                    var_defs.push(def);
                    if (!is("punc", ","))
                        break;
                    next();
                }
                return var_defs;
            }