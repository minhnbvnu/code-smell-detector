function append_var(decls, expressions, name, value) {
                var def = name.definition();
                // Name already exists, only when a function argument had the same name
                const already_appended = scope.variables.has(name.name);
                if (!already_appended) {
                    scope.variables.set(name.name, def);
                    scope.enclosed.push(def);
                    decls.push(make_node(AST_VarDef, name, {
                        name: name,
                        value: null
                    }));
                }
                var sym = make_node(AST_SymbolRef, name, name);
                def.references.push(sym);
                if (value)
                    expressions.push(make_node(AST_Assign, self, {
                        operator: "=",
                        logical: false,
                        left: sym,
                        right: value.clone()
                    }));
            }