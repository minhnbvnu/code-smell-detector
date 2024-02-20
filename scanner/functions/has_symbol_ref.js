function has_symbol_ref(value) {
            var found;
            value.walk(new TreeWalker(function(node) {
                if (node instanceof AST_SymbolRef) found = true;
                if (found) return true;
            }));
            return found;
        }