function varify(self, compressor) {
        return compressor.option("varify") && all(self.definitions, function(defn) {
            return !defn.name.match_symbol(function(node) {
                if (node instanceof AST_SymbolDeclaration) return !can_varify(compressor, node);
            }, true);
        }) ? to_var(self) : self;
    }