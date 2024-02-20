function remove_initializers(make_value) {
        return function(compressor, defns) {
            var dropped = false;
            this.definitions.forEach(function(defn) {
                if (defn.value) dropped = true;
                defn.name.match_symbol(function(node) {
                    if (node instanceof AST_SymbolDeclaration) defns.push(make_node(AST_VarDef, node, {
                        name: node,
                        value: make_value(compressor, node)
                    }));
                }, true);
            });
            return dropped;
        };
    }