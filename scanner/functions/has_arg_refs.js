function has_arg_refs(node) {
            var found = false;
            node.walk(new TreeWalker(function(node) {
                if (found) return true;
                if (node instanceof AST_SymbolRef && fn.variables.get(node.name) === node.definition()) {
                    return found = true;
                }
            }));
            return found;
        }