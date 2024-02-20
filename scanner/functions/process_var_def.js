function process_var_def(var_def) {
                if (!var_def.value) return;
                exprs.push(make_node(AST_Assign, var_def, {
                    operator: "=",
                    left: var_def.name.convert_symbol(AST_SymbolRef, function(ref) {
                        refs.push(ref);
                    }),
                    right: var_def.value
                }));
            }