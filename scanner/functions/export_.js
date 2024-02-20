function export_() {
        if (is("operator", "*")) {
            next();
            var alias = "*";
            if (is("name", "as")) {
                next();
                if (!is_alias()) expect_token("name");
                alias = S.token.value;
                next();
            }
            expect_token("name", "from");
            var path = S.token;
            expect_token("string");
            semicolon();
            return new AST_ExportForeign({
                aliases: [ alias ],
                keys: [ "*" ],
                path: path.value,
                quote: path.quote,
            });
        }
        if (is("punc", "{")) {
            next();
            var aliases = [];
            var keys = [];
            while (is_alias()) {
                var key = S.token;
                next();
                keys.push(key);
                if (is("name", "as")) {
                    next();
                    if (!is_alias()) expect_token("name");
                    aliases.push(S.token.value);
                    next();
                } else {
                    aliases.push(key.value);
                }
                if (!is("punc", "}")) expect(",");
            }
            expect("}");
            if (is("name", "from")) {
                next();
                var path = S.token;
                expect_token("string");
                semicolon();
                return new AST_ExportForeign({
                    aliases: aliases,
                    keys: keys.map(function(token) {
                        return token.value;
                    }),
                    path: path.value,
                    quote: path.quote,
                });
            }
            semicolon();
            return new AST_ExportReferences({
                properties: keys.map(function(token, index) {
                    if (!is_token(token, "name")) token_error(token, "Name expected");
                    var sym = _make_symbol(AST_SymbolExport, token);
                    sym.alias = aliases[index];
                    return sym;
                }),
            });
        }
        if (is("keyword", "default")) {
            next();
            var start = S.token;
            var body = export_default_decl();
            if (body) {
                body.start = start;
                body.end = prev();
            } else {
                handle_regexp();
                body = expression();
                semicolon();
            }
            return new AST_ExportDefault({ body: body });
        }
        return new AST_ExportDeclaration({ body: export_decl() });
    }