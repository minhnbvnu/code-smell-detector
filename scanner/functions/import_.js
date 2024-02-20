function import_() {
        var all = null;
        var def = as_symbol(AST_SymbolImport, true);
        var props = null;
        if (def ? (def.key = "", is("punc", ",") && next()) : !is("string")) {
            if (is("operator", "*")) {
                next();
                expect_token("name", "as");
                all = as_symbol(AST_SymbolImport);
                all.key = "*";
            } else {
                expect("{");
                props = [];
                while (is_alias()) {
                    var alias;
                    if (is_token(peek(), "name", "as")) {
                        var key = S.token.value;
                        next();
                        next();
                        alias = as_symbol(AST_SymbolImport);
                        alias.key = key;
                    } else {
                        alias = as_symbol(AST_SymbolImport);
                        alias.key = alias.name;
                    }
                    props.push(alias);
                    if (!is("punc", "}")) expect(",");
                }
                expect("}");
            }
        }
        if (all || def || props) expect_token("name", "from");
        var path = S.token;
        expect_token("string");
        semicolon();
        return new AST_Import({
            all: all,
            default: def,
            path: path.value,
            properties: props,
            quote: path.quote,
        });
    }