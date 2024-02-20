function export_statement() {
                var start = S.token;
                var is_default;
                var exported_names;
                if (is("keyword", "default")) {
                    is_default = true;
                    next();
                }
                else if (exported_names = map_names(false)) {
                    if (is("name", "from")) {
                        next();
                        var mod_str = S.token;
                        if (mod_str.type !== "string") {
                            unexpected();
                        }
                        next();
                        const assert_clause = maybe_import_assertion();
                        return new AST_Export({
                            start: start,
                            is_default: is_default,
                            exported_names: exported_names,
                            module_name: new AST_String({
                                start: mod_str,
                                value: mod_str.value,
                                quote: mod_str.quote,
                                end: mod_str,
                            }),
                            end: prev(),
                            assert_clause
                        });
                    }
                    else {
                        return new AST_Export({
                            start: start,
                            is_default: is_default,
                            exported_names: exported_names,
                            end: prev(),
                        });
                    }
                }
                var node;
                var exported_value;
                var exported_definition;
                if (is("punc", "{")
                    || is_default
                        && (is("keyword", "class") || is("keyword", "function"))
                        && is_token(peek(), "punc")) {
                    exported_value = expression(false);
                    semicolon();
                }
                else if ((node = statement(is_default)) instanceof AST_Definitions && is_default) {
                    unexpected(node.start);
                }
                else if (node instanceof AST_Definitions
                    || node instanceof AST_Defun
                    || node instanceof AST_DefClass) {
                    exported_definition = node;
                }
                else if (node instanceof AST_ClassExpression
                    || node instanceof AST_Function) {
                    exported_value = node;
                }
                else if (node instanceof AST_SimpleStatement) {
                    exported_value = node.body;
                }
                else {
                    unexpected(node.start);
                }
                return new AST_Export({
                    start: start,
                    is_default: is_default,
                    exported_value: exported_value,
                    exported_definition: exported_definition,
                    end: prev(),
                    assert_clause: null
                });
            }