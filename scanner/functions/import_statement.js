function import_statement() {
                var start = prev();
                var imported_name;
                var imported_names;
                if (is("name")) {
                    imported_name = as_symbol(AST_SymbolImport);
                }
                if (is("punc", ",")) {
                    next();
                }
                imported_names = map_names(true);
                if (imported_names || imported_name) {
                    expect_token("name", "from");
                }
                var mod_str = S.token;
                if (mod_str.type !== "string") {
                    unexpected();
                }
                next();
                const assert_clause = maybe_import_assertion();
                return new AST_Import({
                    start,
                    imported_name,
                    imported_names,
                    module_name: new AST_String({
                        start: mod_str,
                        value: mod_str.value,
                        quote: mod_str.quote,
                        end: mod_str,
                    }),
                    assert_clause,
                    end: S.token,
                });
            }