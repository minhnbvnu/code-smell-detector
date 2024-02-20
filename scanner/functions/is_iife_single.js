function is_iife_single(call) {
        var exp = call.expression;
        if (exp.name) return false;
        if (!(call instanceof AST_New)) return true;
        var found = false;
        exp.walk(new TreeWalker(function(node) {
            if (found) return true;
            if (node instanceof AST_NewTarget) return found = true;
            if (node instanceof AST_Scope && node !== exp) return true;
        }));
        return !found;
    }