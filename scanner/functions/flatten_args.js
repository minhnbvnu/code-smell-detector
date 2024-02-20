function flatten_args(decls, expressions) {
                var len = fn.argnames.length;
                for (var i = self.args.length; --i >= len;) {
                    expressions.push(self.args[i]);
                }
                for (i = len; --i >= 0;) {
                    var name = fn.argnames[i];
                    var value = self.args[i];
                    if (has_flag(name, UNUSED) || !name.name || scope.conflicting_def(name.name)) {
                        if (value)
                            expressions.push(value);
                    }
                    else {
                        var symbol = make_node(AST_SymbolVar, name, name);
                        name.definition().orig.push(symbol);
                        if (!value && in_loop)
                            value = make_node(AST_Undefined, self);
                        append_var(decls, expressions, symbol, value);
                    }
                }
                decls.reverse();
                expressions.reverse();
            }