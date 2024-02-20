function to_var(stat) {
        return make_node(AST_Var, stat, {
            definitions: stat.definitions.map(function(defn) {
                return make_node(AST_VarDef, defn, {
                    name: defn.name.convert_symbol(AST_SymbolVar, function(name, node) {
                        var def = name.definition();
                        def.orig[def.orig.indexOf(node)] = name;
                        var scope = def.scope.resolve();
                        if (def.scope === scope) return;
                        def.scope = scope;
                        scope.variables.set(def.name, def);
                        scope.enclosed.push(def);
                        scope.var_names()[def.name] = true;
                    }),
                    value: defn.value,
                });
            })
        });
    }