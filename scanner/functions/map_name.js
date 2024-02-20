function map_name(is_import) {
                function make_symbol(type, quote) {
                    return new type({
                        name: as_property_name(),
                        quote: quote || undefined,
                        start: prev(),
                        end: prev()
                    });
                }
                var foreign_type = is_import ? AST_SymbolImportForeign : AST_SymbolExportForeign;
                var type = is_import ? AST_SymbolImport : AST_SymbolExport;
                var start = S.token;
                var foreign_name;
                var name;
                if (is_import) {
                    foreign_name = make_symbol(foreign_type, start.quote);
                }
                else {
                    name = make_symbol(type, start.quote);
                }
                if (is("name", "as")) {
                    next(); // The "as" word
                    if (is_import) {
                        name = make_symbol(type);
                    }
                    else {
                        foreign_name = make_symbol(foreign_type, S.token.quote);
                    }
                }
                else if (is_import) {
                    name = new type(foreign_name);
                }
                else {
                    foreign_name = new foreign_type(name);
                }
                return new AST_NameMapping({
                    start: start,
                    foreign_name: foreign_name,
                    name: name,
                    end: prev(),
                });
            }