function has_block_scope_refs(node) {
            var found = false;
            node.walk(new TreeWalker(function(node) {
                if (found) return true;
                if (node instanceof AST_SymbolRef) {
                    if (!member(node.definition(), self.enclosed)) found = true;
                    return true;
                }
            }));
            return found;
        }