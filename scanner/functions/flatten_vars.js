function flatten_vars(decls, expressions) {
                var pos = expressions.length;
                for (var i = 0, lines = fn.body.length; i < lines; i++) {
                    var stat = fn.body[i];
                    if (!(stat instanceof AST_Var))
                        continue;
                    for (var j = 0, defs = stat.definitions.length; j < defs; j++) {
                        var var_def = stat.definitions[j];
                        var name = var_def.name;
                        append_var(decls, expressions, name, var_def.value);
                        if (in_loop && fn.argnames.every((argname) => argname.name != name.name)) {
                            var def = fn.variables.get(name.name);
                            var sym = make_node(AST_SymbolRef, name, name);
                            def.references.push(sym);
                            expressions.splice(pos++, 0, make_node(AST_Assign, var_def, {
                                operator: "=",
                                logical: false,
                                left: sym,
                                right: make_node(AST_Undefined, name)
                            }));
                        }
                    }
                }
            }