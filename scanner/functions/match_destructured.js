function match_destructured(predicate, ignore_side_effects) {
        var found = false;
        var tw = new TreeWalker(function(node) {
            if (found) return true;
            if (node instanceof AST_DefaultValue) {
                if (!ignore_side_effects) return found = true;
                node.name.walk(tw);
                return true;
            }
            if (node instanceof AST_DestructuredKeyVal) {
                if (!ignore_side_effects && node.key instanceof AST_Node) return found = true;
                node.value.walk(tw);
                return true;
            }
            if (predicate(node)) return found = true;
        });
        this.walk(tw);
        return found;
    }